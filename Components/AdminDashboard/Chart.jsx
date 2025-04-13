// Assets
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJs,
  ArcElement,
  Legend,
  Tooltip,
  elements,
} from "chart.js";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

ChartJs.register(ArcElement, Legend, Tooltip);

const Chart = () => {
  const data = {
    datasets: [
      {
        label: "States",
        data: [21000, 1000, 19000, 15900],
        backgroundColor: ["#0062FF", "#FF974A", "#3DD598", "#FFC542"],
      },
    ],

    labels: ["Lagos", "Abuja", "Kano", "Kaduna"],
  };

  const options = {
    cutout: "90%",
    layout: {
      padding: 10,
    },
    elements: {
      arc: {
        borderWidth: 1,
        borderJoinStyle: "bevel",
      },
    },

    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          padding: 20,
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };
  return (
    <section className="w-full md:w-72 h-fit ring-1 ring-slate-400 rounded-md">
      <div className=" flex items-center justify-between px-2 md:px-8 py-4 ">
        <MdOutlineKeyboardArrowLeft size={25} />
        <p className=" font-bold text-lg "> 2022 </p>
        <MdOutlineKeyboardArrowRight size={25} />
      </div>

      <Doughnut data={data} options={options} />
    </section>
  );
};

export default Chart;
