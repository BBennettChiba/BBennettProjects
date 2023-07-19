import { FaCloud, FaSun } from "react-icons/fa";
import { api } from "~/utils/api";

export default function Weather() {
  const { data } = api.weather.get.useQuery({
    latitude: 35.6762,
    longitude: 139.6503,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const info = [
    { label: "HIGH", value: "32\u00b0" },
    { label: "FL HIGH", value: "27\u00b0" },
    { label: "WIND", value: "9kph" },
    { label: "LOW", value: "19\u00b0" },
    { label: "FL LOW", value: "12\u00b0" },
    { label: "PRECIP", value: "0.1cm" },
  ];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const td = [];

  console.log(data);

  return (
    <div className="container">
      <div className="mx-32 mt-20 ">
        <div className="flex items-center rounded-lg bg-base-300 p-20">
          <div className="m-2 flex w-1/2 items-center justify-center border-r p-2">
            <FaSun size={100} />
            <div className="ml-5 text-6xl">
              <span>31</span>&deg;
            </div>
          </div>
          <div className="divider-vertical" />
          <div className="grid w-1/2 grid-cols-3 grid-rows-2 justify-between gap-2 text-3xl">
            {info.map(({ label, value }, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="font-size text-xs font-bold">{label}</div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        </div>
        <section className="grid grid-cols-[repeat(auto-fit,175px)] justify-center gap-2 p-4">
          {days.map((day, i) => (
            <div
              key={i}
              className="card flex flex-col items-center justify-between rounded-md border p-4 text-2xl"
            >
              <FaSun size={50} />
              <div>{day}</div>
              <div>32&deg;</div>
            </div>
          ))}
        </section>
        <table className="w-full border-spacing-0 text-center">
          <tbody>
            <tr className="odd:bg-base-300 even:bg-base-200">
              <td className="px-2 py-1">
                <div>Thursday</div>
                <div>3 pm</div>
              </td>
              <td>
                <FaCloud size={30} />
              </td>
              <td>
                <div>TEMP</div>
                <div>30&deg;</div>
              </td>
              <td>
                <div>FL TEMP</div>
                <div>30&deg;</div>
              </td>
              <td>
                <div>WIND</div>
                <div>30kph</div>
              </td>
              <td>
                <div>PRECIP</div>
                <div>0cm</div>
              </td>
            </tr>
            <tr className="odd:bg-base-300 even:bg-base-200">
              <td>
                <div>Thursday</div>
                <div>3 pm</div>
              </td>
              <td>
                <FaCloud size={30} />
              </td>
              <td>
                <div>TEMP</div>
                <div>30&deg;</div>
              </td>
              <td>
                <div>FL TEMP</div>
                <div>30&deg;</div>
              </td>
              <td>
                <div>WIND</div>
                <div>30kph</div>
              </td>
              <td>
                <div>PRECIP</div>
                <div>0cm</div>
              </td>
            </tr>
            <tr className="odd:bg-base-300 even:bg-base-200">
              <td>
                <div>Thursday</div>
                <div>3 pm</div>
              </td>
              <td>
                <FaCloud size={30} />
              </td>
              <td>
                <div>TEMP</div>
                <div>30&deg;</div>
              </td>
              <td>
                <div>FL TEMP</div>
                <div>30&deg;</div>
              </td>
              <td>
                <div>WIND</div>
                <div>30kph</div>
              </td>
              <td>
                <div>PRECIP</div>
                <div>0cm</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
