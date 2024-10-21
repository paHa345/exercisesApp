import RefreshButton from "@/app/components/TestRefreshData/RefreshButton";
import React from "react";

async function getData() {
  const timeArr = [];
  const data = new Date().toISOString();
  timeArr.push(data);
  const data2 = new Date().toISOString();
  timeArr.push(data2);

  return timeArr;
}

const testRevalidate = async ({ timestamp }: any) => {
  // const [result, setResult] = useState("");

  const timeData = await getData();
  const timeDataEl = timeData.map((el, index) => {
    return <div key={`${el}+${index}`}>{el}</div>;
  });

  return (
    <div className="root">
      <div className="timestamp">{timeDataEl}</div>

      {/* <div>{result}</div> */}
      <div className="actions">
        <RefreshButton></RefreshButton>
        {/* <button
          onClick={() => {
            revalidate();
          }}
        >
          Revalidate
        </button> */}
        {/* <a href="">Refresh</a> */}
      </div>
    </div>
  );
};

// export async function getStaticProps() {
//   return {
//     props: {
//       timestamp: new Date().toISOString(),
//     },
//   };
// }

export default testRevalidate;
