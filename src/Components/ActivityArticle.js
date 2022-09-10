/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Loader from "./Loader";

class ActivityArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null,
    };
  }

  componentDidMount() {
    this.setState({ activity: this.props.activity });
  }
  render() {
    return (
      <>
        {this.state.activity ? (
          <article className="article-activity flex">
            <div className="article-left flex-30 flex center">
              <div>
                <h3>{this.state.activity.ActivityName}</h3>
                <h4>{this.state.activity.month.name}</h4>
              </div>
            </div>
            <div className="article-right flex-70 flex">
              {this.state.activity.days.map((day, i) => {
                return (
                  <a
                    href="#"
                    key={i}
                    className={day.isDone ? "button active" : "button"}
                    onClick={(event) => {
                      this.props.handleClickDay(day, i, this.props.dataIndex);
                    }}
                  >
                    {day.noOfDay}
                  </a>
                );
              })}
            </div>
            <div className="close-div">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-circle"
                viewBox="0 0 16 16"
                onClick={(event) => {
                  this.props.removeActivity(this.props.dataIndex);
                }}
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
          </article>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

export default ActivityArticle;
