
import { GlossaryTerm } from "./types";

export const technicalAnalysisTerms: GlossaryTerm[] = [
  {
    term: "Technical Analysis",
    definition: "The study of past market data, primarily price and volume, to forecast future price movements.",
    categories: ["technical_analysis"],
    related: ["Chart Analysis", "Trading", "Market Trends"]
  },
  {
    term: "Candlestick Chart",
    definition: "A type of price chart that displays the high, low, open, and closing prices of an asset for a specific period.",
    categories: ["technical_analysis"],
    related: ["Technical Analysis", "Price Action", "Trading"]
  },
  {
    term: "Support Level",
    definition: "A price level where an asset tends to find buying interest and bounce back up from declining prices.",
    categories: ["technical_analysis"],
    related: ["Resistance Level", "Price Action", "Technical Analysis"]
  },
  {
    term: "Resistance Level",
    definition: "A price level where an asset tends to face selling pressure and struggle to break above.",
    categories: ["technical_analysis"],
    related: ["Support Level", "Price Action", "Technical Analysis"]
  },
  {
    term: "Moving Average",
    definition: "A technical indicator that smooths price data by calculating the average price over a specific number of periods.",
    categories: ["technical_analysis"],
    related: ["SMA", "EMA", "Trend Indicator"]
  },
  {
    term: "RSI",
    definition: "Relative Strength Index - a momentum oscillator that measures the speed and change of price movements.",
    categories: ["technical_analysis"],
    related: ["Oscillator", "Momentum", "Overbought"]
  },
  {
    term: "MACD",
    definition: "Moving Average Convergence Divergence - a trend-following momentum indicator that shows relationships between two moving averages.",
    categories: ["technical_analysis"],
    related: ["Moving Average", "Momentum", "Signal Line"]
  },
  {
    term: "Bollinger Bands",
    definition: "A volatility indicator consisting of a moving average and two standard deviation bands above and below it.",
    categories: ["technical_analysis"],
    related: ["Volatility", "Standard Deviation", "Price Bands"]
  },
  {
    term: "Volume",
    definition: "The number of shares or contracts traded in a security or market during a given period.",
    categories: ["technical_analysis", "exchanges_trading"],
    related: ["Trading Volume", "Market Activity", "Liquidity"]
  },
  {
    term: "Fibonacci Retracement",
    definition: "A technical analysis tool that uses horizontal lines to indicate areas of support or resistance at key Fibonacci levels.",
    categories: ["technical_analysis"],
    related: ["Retracement Levels", "Support", "Resistance"]
  },
  {
    term: "Bull Flag",
    definition: "A bullish continuation pattern that appears as a brief consolidation after a strong upward price movement.",
    categories: ["technical_analysis"],
    related: ["Chart Pattern", "Bullish Pattern", "Continuation"]
  },
  {
    term: "Bear Flag",
    definition: "A bearish continuation pattern that appears as a brief consolidation after a strong downward price movement.",
    categories: ["technical_analysis"],
    related: ["Chart Pattern", "Bearish Pattern", "Continuation"]
  },
  {
    term: "Head and Shoulders",
    definition: "A reversal chart pattern that indicates a change from bullish to bearish trend or vice versa.",
    categories: ["technical_analysis"],
    related: ["Reversal Pattern", "Chart Pattern", "Trend Change"]
  },
  {
    term: "Double Top",
    definition: "A bearish reversal pattern that occurs when price reaches a high twice and fails to break above it.",
    categories: ["technical_analysis"],
    related: ["Reversal Pattern", "Bearish Signal", "Peak Formation"]
  },
  {
    term: "Double Bottom",
    definition: "A bullish reversal pattern that occurs when price reaches a low twice and bounces back up.",
    categories: ["technical_analysis"],
    related: ["Reversal Pattern", "Bullish Signal", "Support Level"]
  },
  {
    term: "Cup and Handle",
    definition: "A bullish continuation pattern that resembles a cup with a handle when viewed on a price chart.",
    categories: ["technical_analysis"],
    related: ["Bullish Pattern", "Continuation Pattern", "Breakout"]
  },
  {
    term: "Triangle Pattern",
    definition: "A continuation pattern where price moves within converging trend lines, indicating a potential breakout.",
    categories: ["technical_analysis"],
    related: ["Chart Pattern", "Breakout", "Consolidation"]
  },
  {
    term: "Breakout",
    definition: "When the price of an asset moves above resistance or below support with increased volume.",
    categories: ["technical_analysis"],
    related: ["Support", "Resistance", "Volume Confirmation"]
  },
  {
    term: "Trend Line",
    definition: "A straight line connecting two or more price points that acts as support or resistance.",
    categories: ["technical_analysis"],
    related: ["Support", "Resistance", "Trend Direction"]
  },
  {
    term: "Momentum",
    definition: "The rate of change in price movement, often used to identify the strength of a trend.",
    categories: ["technical_analysis"],
    related: ["Price Velocity", "Trend Strength", "Oscillator"]
  }
];
