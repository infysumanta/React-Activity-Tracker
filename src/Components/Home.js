import React, { Component } from "react";
import ActivityDiv from "./ActivityDiv";

import Header from "./Header";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          ActivityName: "",
          month: {},
          days: [],
        },
      ],
    };
  }

  componentDidMount() {
    let fetchedData = JSON.parse(localStorage.getItem("data"));
    this.setState({ data: fetchedData });
  }

  removeEntry = (activityIndex) => {
    let updatedData = [...this.state.data];
    updatedData.splice(activityIndex, 1);

    this.setState((prevState) => {
      localStorage.setItem("data", JSON.stringify(updatedData));
      return {
        data: updatedData,
      };
    });
  };

  updateMainData = (updatedData) => {
    this.setState((prevState) => {
      localStorage.setItem("data", JSON.stringify(updatedData));
      return { data: updatedData };
    });
  };

  monthFinder = (monthNo) => {
    let months = {
      0: { name: "January ", days: 31 },
      1: { name: "February  ", days: 28 },
      2: { name: "March  ", days: 31 },
      3: { name: "April  ", days: 30 },
      4: { name: "May  ", days: 31 },
      5: { name: "June  ", days: 30 },
      6: { name: "July  ", days: 31 },
      7: { name: "August  ", days: 31 },
      8: { name: "September ", days: 30 },
      9: { name: "October ", days: 31 },
      10: { name: "November ", days: 30 },
      11: { name: "December ", days: 31 },
    };

    return months[monthNo];
  };

  addNewActivity = (event) => {
    let eventName = event.target.input.value;
    let time = new Date();
    let month = this.monthFinder(time.getMonth());

    let arrayOfDays = [];
    for (let i = 0; i < month.days; i++) {
      arrayOfDays[i] = { noOfDay: i + 1, isDone: false };
    }

    let newData = {
      ActivityName: eventName,
      month: month,
      days: arrayOfDays,
    };

    console.log("newly created Data", newData);

    this.setState((prevState) => {
      if (prevState.data) {
        localStorage.setItem(
          "data",
          JSON.stringify(prevState.data.concat(newData))
        );
        return {
          data: prevState.data.concat(newData),
        };
      } else {
        localStorage.setItem("data", JSON.stringify([newData]));
        return {
          data: [newData],
        };
      }
    });

    event.target.input.value = null;
  };
  render() {
    return (
      <>
        <Header addNewActivity={this.addNewActivity} />

        {this.state.data ? (
          this.state.data.length > 0 ? (
            <ActivityDiv
              data={this.state.data}
              updateMainData={this.updateMainData}
              removeEntry={this.removeEntry}
            />
          ) : (
            <section className="error-sec">
              <h2 className="text-center">No Activity To Display</h2>
            </section>
          )
        ) : (
          ""
        )}
      </>
    );
  }
}

export default Home;
