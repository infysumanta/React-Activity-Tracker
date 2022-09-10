import React, { Component } from "react";
import ActivityArticle from "./ActivityArticle";
import Loader from "./Loader";

class ActivityDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  removeActivity = (activityIndex) => {
    this.props.removeEntry(activityIndex);
  };

  handleClickDay = (day, i, dataIndex) => {
    let updatedData = [...this.state.data];
    updatedData[dataIndex].days[i].isDone =
      !updatedData[dataIndex].days[i].isDone;

    this.props.updateMainData(updatedData);
  };

  componentDidMount() {
    this.setState({ data: this.props.data });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  }
  render() {
    return (
      <>
        {this.state.data ? (
          <section className="activityDiv-sec container">
            {this.state.data.map((activity, i) => {
              return (
                <ActivityArticle
                  activity={activity}
                  key={activity.ActivityName}
                  dataIndex={i}
                  handleClickDay={this.handleClickDay}
                  removeActivity={this.removeActivity}
                />
              );
            })}
          </section>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

export default ActivityDiv;
