import Link from "next/link";

export default function Index() {
  return (
    <div className="container mx-auto mt-10 w-2/3">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Status</th>
            <th>Title</th>
            <th>Solution</th>
            <th>difficulty</th>
          </tr>
        </thead>
        <tbody>
          <tr>
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
  );
}
