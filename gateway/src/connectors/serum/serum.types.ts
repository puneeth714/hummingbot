import {PublicKey} from '@solana/web3.js';
import {Market as SerumMarket, Orderbook as SerumOrderBook} from '@project-serum/serum';
import {Order as SerumOrder} from '@project-serum/serum/lib/market';
import {Map as ImmutableMap} from 'immutable';
import BN from "bn.js";

export type IMap<K, V> = ImmutableMap<K, V>;
export const IMap = ImmutableMap;

interface PlainBasicSerumMarket {
  address: string;
  deprecated: boolean;
  name: string;
  programId: string;
}

interface FatBasicSerumMarket {
    address: PublicKey;
    name: string;
    programId: PublicKey;
    deprecated: boolean;
}

export type BasicSerumMarket = PlainBasicSerumMarket | FatBasicSerumMarket;

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

// TODO the status are not being fully used!!!
export enum OrderStatus {
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  FILLED = 'FILLED',
  CANCELED = 'CANCELED',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
  TIMED_OUT = 'TIMED_OUT',
  UNKNOWN = 'UNKNOWN',
}

export enum OrderType {
  LIMIT = 'LIMIT',
  IOC = 'IOC',// Immediate or Cancel
  POST_ONLY = 'POST_ONLY',
}

export interface Market {
  name: string;
  address: PublicKey;
  programId: PublicKey;
  deprecated: boolean;
  minimumOrderSize: number;
  tickSize: number;
  minimumBaseIncrement?: BN;
  fees: Fee;
  market: SerumMarket;
}

export interface OrderBook {
  market: Market;
  bids: IMap<string, Order>;
  asks: IMap<string, Order>;
  orderBook: {
    asks: SerumOrderBook;
    bids: SerumOrderBook;
  };
}

export interface Ticker {
  price: number;
  amount: number;
  side: OrderSide;
  fee: number;
  timestamp: number;
  ticker: any;
}

export interface Order {
  id?: string; // client id
  exchangeId?: string;
  marketName: string;
  ownerAddress?: string;
  price: number;
  amount: number;
  side: OrderSide;
  status?: OrderStatus;
  type?: OrderType;
  fee?: number;
  fillmentTimestamp?: number;
  signature?: string;
  order?: SerumOrder;
}

export interface Fee {
  maker: number;
  taker: number;
}

//
// Requests subtypes
//

export type GetMarketsRequest =
  {}
  | { name: string }
  | { names: string[] };

export interface GetMarketResponse {
  name: string;
  address: PublicKey;
  programId: PublicKey;
  deprecated: boolean;
  minimumOrderSize: number;
  tickSize: number;
  minimumBaseIncrement?: BN;
  fees: Fee;
}

export type GetMarketsResponse = IMap<string, GetMarketResponse> | GetMarketResponse;

export type GetOrderBooksRequest =
  {}
  | { marketName: string }
  | { marketNames: string[] };

export interface GetOrderBookResponse {
  market: GetMarketResponse;
  bids: IMap<string, GetOrderResponse>;
  asks: IMap<string, GetOrderResponse>;
}
export type GetOrderBooksResponse = IMap<string, GetOrderBookResponse> | GetOrderBookResponse;

export type GetTickersRequest =
  {}
  | { marketName: string }
  | { marketNames: string[] };

export interface GetTickerResponse {
  price: number;
  amount: number;
  side: OrderSide;
  fee: number;
  timestamp: number;
}

export type GetTickersResponse = IMap<string, GetTickerResponse> | GetTickerResponse;

export interface GetOrderRequest {
  id?: string;
  exchangeId?: string;
  marketName?: string;
  ownerAddress: string;
}

export interface GetOrdersRequest {
  ids?: string[];
  exchangeIds?: string[];
  marketName?: string;
  ownerAddress: string;
}

export interface GetOrderResponse {
  id?: string;
  exchangeId?: string;
  marketName: string;
  ownerAddress: string;
  price: number;
  amount: number;
  side: OrderSide;
  status?: OrderStatus;
  type?: OrderType;
  fee?: number;
  fillmentTimestamp?: number;
}

export type GetOrdersResponse = IMap<string, IMap<string, GetOrderResponse>> | IMap<string, GetOrderResponse> | GetOrderResponse;

export interface CreateOrdersRequest {
  id?: string;
  marketName: string;
  ownerAddress: string;
  payerAddress: string;
  side: OrderSide;
  price: number;
  amount: number;
  type?: OrderType;
}

export interface CreateOrderResponse {
  id?: string;
  exchangeId?: string;
  marketName: string;
  ownerAddress: string;
  price: number;
  amount: number;
  side: OrderSide;
  status?: OrderStatus;
  type?: OrderType;
  fee?: number
}

export type CreateOrdersResponse = IMap<string, CreateOrderResponse> | CreateOrderResponse;

export interface CancelOrderRequest {
  id?: string;
  exchangeId?: string;
  marketName: string;
  ownerAddress: string;
}

export interface CancelOrdersRequest {
  ids?: string[];
  exchangeIds?: string[];
  marketName: string;
  ownerAddress: string;
}

export interface CancelOrderResponse {
  id?: string;
  exchangeId?: string;
  marketName: string;
  ownerAddress: string;
  price: number;
  amount: number;
  side: OrderSide;
  status?: OrderStatus; // TODO fill status!!!
  type?: OrderType;
  fee?: number
}

export type CancelOrdersResponse = IMap<string, CancelOrderResponse> | CancelOrderResponse;

export interface GetOpenOrderRequest {
  id?: string;
  exchangeId?: string;
  marketName?: string;
  ownerAddress: string;
}

export interface GetOpenOrdersRequest {
  ids?: string[];
  exchangeIds?: string[];
  marketName?: string;
  ownerAddress: string;
}

export interface GetOpenOrderResponse {
  id?: string;
  exchangeId?: string;
  marketName: string;
  ownerAddress: string;
  price: number;
  amount: number;
  side: OrderSide;
  status?: OrderStatus;
  type?: OrderType;
  fee?: number
}

export type GetOpenOrdersResponse = IMap<string, IMap<string, GetOpenOrderResponse>> | IMap<string, GetOpenOrderResponse> | GetOpenOrderResponse;

export interface CancelOpenOrderRequest {
  id?: string;
  exchangeId?: string;
  marketName: string;
  ownerAddress: string;
}

export interface CancelOpenOrdersRequest {
  ids?: string[];
  exchangeIds?: string[];
  marketName: string;
  ownerAddress: string;
}

export interface CancelOpenOrderResponse {
  id?: string;
  exchangeId?: string;
  marketName: string;
  ownerAddress: string;
  price: number;
  amount: number;
  side: OrderSide;
  status?: OrderStatus; // TODO fill this status!!!
  type?: OrderType;
  fee?: number
}

export type CancelOpenOrdersResponse = IMap<string, IMap<string, CancelOpenOrderResponse>> | IMap<string, CancelOpenOrderResponse> | CancelOpenOrderResponse;

export interface GetFilledOrderRequest {
  id?: string;
  exchangeId?: string;
  marketName?: string;
  ownerAddress: string;
}

export interface GetFilledOrdersRequest {
  ids?: string[];
  exchangeIds?: string[];
  marketName?: string;
  ownerAddress?: string;
}

export interface GetFilledOrderResponse {
  id?: string;
  exchangeId?: string;
  marketName: string;
  ownerAddress: string;
  price: number;
  amount: number;
  side: OrderSide;
  status?: OrderStatus;
  type?: OrderType;
  fee?: number;
  fillmentTimestamp?: number;
}

export type GetFilledOrdersResponse = IMap<string, IMap<string, GetFilledOrderResponse>> | IMap<string, GetFilledOrderResponse> | GetFilledOrderResponse;

//
//  Errors
//

export class SerumishError extends Error {}

export class MarketNotFoundError extends SerumishError {}

export class TickerNotFoundError extends SerumishError {}

export class OrderNotFoundError extends SerumishError {}
