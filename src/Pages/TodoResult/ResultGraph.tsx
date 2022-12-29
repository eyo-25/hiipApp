import ApexChart from "react-apexcharts";
import { Blue, Normal_Gray2 } from "../../Styles/Colors";

function ResultGraph() {
  const data = [50, 40, 35.5, 10, 100, 0, 0];
  const data2 = [50, 40, 35.5, 10, 100];
  const calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <>
      <ApexChart
        type="bar"
        series={[
          {
            name: "Website Blog",
            type: "column",
            data: data?.map((price) => price) as number[],
          },
          //   {
          //     name: "Social Media",
          //     type: "line",
          //     data: data2?.map((price) => price) as number[],
          //   },
        ]}
        options={{
          chart: {
            height: 300,
            width: 500,
            animations: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          fill: {
            colors: [Blue],
            type: "solid",
          },
          stroke: {
            width: [0, 4],
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
          },
          labels: [
            "01 Jan 2001",
            "02 Jan 2001",
            "03 Jan 2001",
            "04 Jan 2001",
            "05 Jan 2001",
            "06 Jan 2001",
            "07 Jan 2001",
          ],
          xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false },
            type: "datetime",
          },
          yaxis: {
            show: false,
          },
        }}
      />
    </>
  );
}

export default ResultGraph;
