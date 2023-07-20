import { type IconType } from "react-icons";
import {
  FaCloud,
  FaSun,
  FaArrowUp,
  FaCloudSun,
  FaSmog,
  FaCloudShowersHeavy,
  FaSnowflake,
} from "react-icons/fa";
import { IoIosThunderstorm } from "react-icons/io";
import { api } from "~/utils/api";

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long" });
const ICON_MAP: Map<number, IconType> = new Map();

const map = (values: number[], icon: IconType) => {
  values.forEach((value) => {
    ICON_MAP.set(value, icon);
  });
};

map([0, 1], FaSun);
map([2], FaCloudSun);
map([3], FaCloud);
map([45, 48], FaSmog);
map([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], FaCloudShowersHeavy);
map([71, 73, 75, 77, 85, 86], FaSnowflake);
map([95, 96, 99], IoIosThunderstorm);

export default function Weather() {
  const { data } = api.weather.get.useQuery({
    latitude: 35.6762,
    longitude: 139.6503,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const { current, hourly, daily } = data || {};

  const currentInfo = [
    <>
      <div className="font-size text-xs font-bold">HIGH</div>
      <div>{current?.highTemp}&deg;</div>
    </>,
    <>
      <div className="font-size text-xs font-bold">FL HIGH</div>
      <div>{current?.highFeelsLike}&deg;</div>
    </>,
    <>
      <div className="font-size text-xs font-bold">WIND</div>
      <div>
        {current?.windSpeed}
        <span className="text-xs">kph</span>
      </div>
    </>,
    <>
      <div className="font-size text-xs font-bold">WIND DIR</div>
      <div style={{ transform: `rotate(${current?.windDirection || 0}deg)` }}>
        <FaArrowUp />
      </div>
    </>,
    <>
      <div className="font-size text-xs font-bold">LOW</div>
      <div>{current?.lowTemp}&deg;</div>
    </>,
    <>
      <div className="font-size text-xs font-bold">FL LOW</div>
      <div>{current?.lowFeelsLike}&deg;</div>
    </>,
    <>
      <div className="font-size text-xs font-bold">PRECIP</div>
      <div>
        {current?.precip}
        <span className="text-xs">cm</span>
      </div>
    </>,
  ];

  return (
    <div className="container m-auto">
      <div className="m-4 md:mx-32 md:mt-20 ">
        <div className="flex rounded-lg bg-base-300 p-4 md:p-10">
          <div className="m-2 flex flex-col md:flex-row w-1/2 items-center justify-center border-r">
            <FaSun size={100} />
            <div className="ml-5 text-6xl">
              <span>{current?.currentTemp || 0}</span>&deg;
            </div>
          </div>
          <div className="divider-vertical" />
          <div className="grid w-1/2 grid-cols-[repeat(auto-fit,3rem)] justify-between gap-2 text-3xl px-6">
            {currentInfo.map((h, i) => (
              <div key={i} className="flex flex-col justify-center">
                {h}
              </div>
            ))}
          </div>
        </div>
        <section className="grid grid-cols-[repeat(auto-fit,10rem)] justify-center gap-2 p-4">
          {daily?.map(({ maxTemp, iconCode, timestamp }, i) => {
            const Icon = ICON_MAP.get(iconCode || 0) || FaSun;
            return (
              <div
                key={i}
                className="card flex flex-col items-center justify-between rounded-md border p-4 text-2xl"
              >
                <Icon />
                <div>{DAY_FORMATTER.format(timestamp)}</div>
                <div>{maxTemp}&deg;</div>
              </div>
            );
          }) || <></>}
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
