import Link from "next/link";

export default function Index() {
  return (
    <div className="flex h-full w-full justify-center bg-oldBG pt-10 text-gray-400">
      <div className="w-2/3">
        <table className="table table-zebra">
          <thead>
            <tr className="border-b border-gray-300">
              <th>Status</th>
              <th>Title</th>
              <th>Solution</th>
              <th>difficulty</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-400">
              <td>X</td>
              <td className="hover:to-blue-700">
                <Link href="/codeChallenge/two-sum">1. Two sum</Link>
              </td>
              <td>LINK</td>
              <td>easy</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
