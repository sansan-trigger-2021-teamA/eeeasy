import React from "react";
import GenericTemplate from "../templates/GenericTemplate";
import {Line} from 'react-chartjs-2'

const data ={
    labels: ["Mon","Tue","Wed","Thu","Fir","Sat","Sun"],
    datasets: [
        {
            label: "Demo Get Plot",
            backgroundColor: "#008080",
            borderColor: "rgba(54, 162, 235, 0.2)",
            pointBorderWidth: 10,
            data: [5,6,40,15,30,40,80]

        }
    ]
}


const HomePage: React.FC = () => {
  return (
    <GenericTemplate title="トップページ">
      <div>
          <h2>getリクエスト数</h2>
          <div>
              <Line data={data}/>
          </div>
      </div>
    </GenericTemplate>
  );
};

export default HomePage;