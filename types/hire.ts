// Game
export type Game = {
  value: string;
  label: string;
};

// Mini
export type Mini = {
  value: string;
  label: string;
};

/**
 * Mini with added qty field. Generally used to mutate
 * a summary line item
 **/
export type MiniWithQuantity = Mini & { qty: number };

// Line Item container which holds game, mini, and qty
export type LineItem = {
  game: Game;
  mini: Mini;
  qty: number;
};
