import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,
} from "../../redux/api/orderApiSlice";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import OrderList from "./OrderList";
import { FaBox, FaWallet } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

const DashBoard = () => {
  const { data: sales, isLoading: loadingSales } = useGetTotalSalesQuery();
  let { data: customers, isLoading: loadingCustomers } = useGetUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
  let { data: salesDetail } = useGetTotalSalesByDateQuery();

  salesDetail = salesDetail?.salesByDate;
  customers = customers?.users;

  const [state, setState] = useState({
    options: {
      chart: {
        type: "bar",
        toolbar: { show: false },
        background: "transparent",
      },
      tooltip: { theme: "dark" },
      colors: ["#00e396", "#775DD0"], // bar + line
      dataLabels: { enabled: false },
      stroke: { width: [0, 3], curve: "smooth" },
      title: {
        text: "Monthly Sales Trend",
        align: "left",
        style: { fontSize: "18px", color: "#fff" },
      },
      markers: { size: 4 },
      xaxis: {
        categories: [],
        title: { text: "Date", style: { color: "#fff" } },
        labels: { style: { colors: "#fff" } },
      },
      yaxis: [
        {
          title: { text: "Sales (₹)", style: { color: "#fff" } },
          labels: { style: { colors: "#fff" } },
        },
      ],
      legend: {
        position: "top",
        horizontalAlign: "right",
        labels: { colors: "#fff" },
      },
      grid: {
        borderColor: "#444",
        strokeDashArray: 5,
      },
      fill: {
        type: ["gradient", "solid"],
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#00c6ff"],
          stops: [0, 100],
        },
      },
    },
    series: [
      { name: "Sales (Bar)", type: "column", data: [] },
      { name: "Sales Trend (Line)", type: "line", data: [] },
    ],
  });

  useEffect(() => {
    if (Array.isArray(salesDetail) && salesDetail.length > 0) {
      const dates = salesDetail.map((s) => s._id);
      const totals = salesDetail.map((s) => s.totalSales);

      setState((prev) => ({
        ...prev,
        series: [
          { name: "Sales (Bar)", type: "column", data: totals },
          { name: "Sales Trend (Line)", type: "line", data: totals },
        ],
        options: {
          ...prev.options,
          xaxis: { ...prev.options.xaxis, categories: dates },
        },
      }));
    }
  }, [salesDetail]);

  return (
    <section className="xl:ml-[4rem] md:ml-[2rem] flex flex-col justify-center items-center">
      {/* Summary Cards */}
      <div className="w-[80%] flex justify-around flex-wrap">
        <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
          <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
            <FaWallet className="size-6 p-0" />
          </div>
          <p className="mt-5">Total Sales</p>
          <h1 className="tex-xl font-bold">
            ₹{loadingSales ? <Loader /> : sales?.totalSales.toFixed(2)}
          </h1>
        </div>

        <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
          <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
            <IoIosPeople className="size-6 p-0" />
          </div>
          <p className="mt-5">Total Customers</p>
          <h1 className="tex-xl font-bold">
            {loadingCustomers ? <Loader /> : customers?.length}
          </h1>
        </div>

        <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
          <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
            <FaBox className="size-6 p-0" />
          </div>
          <p className="mt-5">All Orders</p>
          <h1 className="tex-xl font-bold">
            {loadingOrders ? <Loader /> : orders?.orders}
          </h1>
        </div>
      </div>

      {/* Chart */}
      <div className="ml-[10rem] mt-[4rem] bg-black p-5 rounded-xl shadow-lg">
        <Chart
          options={state.options}
          series={state.series}
          type="line"
          height={400}
          width={900}
        />
      </div>

      <div className="mt-[4rem]">
        <OrderList />
      </div>
    </section>
  );
};

export default DashBoard;
