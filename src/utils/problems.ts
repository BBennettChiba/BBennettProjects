import type assert from "assert";

export type Results = {
  success: boolean;
  testResults: {
    success: boolean;
    input: unknown;
    output: unknown;
  }[];
};

type Test = { nums: number[]; target: number; answer: [number, number] };

/**@TODO add ability for users to write their own checks */
const twoSumHandler = (
  fn: (nums: number[], target: number) => [number, number],
  ass: typeof assert,
  tests: Test[]
) => {
  const results: Results = {
    success: true,
    testResults: [],
  };
  for (const test of tests) {
    const { nums, target, answer } = test;
    const output = fn(nums, target);
    const testResult = { success: false, input: test, output };
    try {
      ass.deepStrictEqual(output, answer);
      testResult.success = true;
    } catch (e: unknown) {
      results.success = false;
    }
    results.testResults.push(testResult);
  }
  return results;
};

export const twoSum = {
  id: "two-sum",
  title: "1. Two Sum",
  problemStatement: [
    `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.`,
    `You may assume that each input would have exactly one solution, and you may not use thesame element twice.`,
    `You can return the answer in any order`,
  ],
  examples: [
    {
      id: 1,
      test: { nums: [2, 7, 11, 16], target: 9, answer: [0, 1] } as Test,
      inputText: "nums = [2, 7, 11, 16], target = 9",
      outputText: "[0, 1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      id: 2,
      test: { nums: [3, 2, 4], target: 6, answer: [1, 2] } as Test,
      inputText: "nums = [3,2,4], target = 6",
      outputText: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
    {
      id: 3,
      test: { nums: [3, 3], target: 6, answer: [0, 1] } as Test,
      inputText: " nums = [3,3], target = 6",
      outputText: "[0,1]",
    },
  ],
  constraints: [
    `2 ≤ nums.length ≤ 10`,
    "-10 ≤ nums[i] ≤ 10",
    "-10 ≤ target ≤ 10",
    "Only one valid answer exists.",
  ],
  handlerFunction: twoSumHandler.toString(),
  starterCode: `const twoSum = (nums: number[], target: number): [number, number] => {
    
}`,
  order: 1,
  starterFunctionName: "twoSum",
};

export type Example = typeof twoSum.examples;

export type Problem = Problems[number];

export const problems = [twoSum];

export type Problems = typeof problems;
