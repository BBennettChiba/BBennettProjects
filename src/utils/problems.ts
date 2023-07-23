export const twoSum: Problem = {
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
      inputText: "nums = [2,7,11,15], target = 9",
      outputText: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      id: 2,
      inputText: "nums = [3,2,4], target = 6",
      outputText: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
    {
      id: 3,
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
  handlerFunction: () => true,
  starterCode: "hello",
  order: 1,
  starterFunctionName: "function twoSum(",
};

export type Example = {
  id: number;
  inputText: string;
  outputText: string;
  explanation?: string;
  img?: string;
};

// local problem data
export type Problem = {
  id: string;
  title: string;
  problemStatement: string[];
  examples: Example[];
  constraints: string[];
  order: number;
  starterCode: string;
  handlerFunction: ((fn: unknown) => boolean) | string;
  starterFunctionName: string;
};

export const problems = [twoSum];
