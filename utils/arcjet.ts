import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
  tokenBucket,
} from "@arcjet/next";

export {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
  tokenBucket,
};

export default arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [],
});
