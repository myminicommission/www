import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";
import { getSession } from "@auth0/nextjs-auth0";

const app = express();

app.use("*", async (req, res, next) => {
  const session = await getSession(req, res);

  return createProxyMiddleware({
    target: process.env.GRAPHQL_SERVER_URL,
    changeOrigin: true,
    proxyTimeout: 5000,
    secure: false,
    headers: {
      Connection: "keep-alive",
    },
    pathRewrite: {
      "^/api/graphql": "",
    },
    onError: (err, req, res) => {
      console.log("err", err, res.json);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(
        "Something went wrong. And we are reporting a custom error message."
      );
    },
    onProxyReq: async (proxyReq, req, res) => {
      if (session) {
        proxyReq.setHeader("Authorization", `Bearer ${session.idToken}`);
      }

      if (req.body) {
        let bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
      }
    },
  })(req, res, next);
});

export default app;
