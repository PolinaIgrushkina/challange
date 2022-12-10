import React, { Component } from "react";

const Item = ({ data }) => {
  const { id, label, parent_id, children } = data;

  return (
    <ul>
      <li style={{ paddingLeft: 10 }}>{label}</li>
      {children && children.map((item) => <Item data={item} key={item.id} />)}
    </ul>
  );
};

class SecondList extends Component {
  state = {
    data: [
      {
        id: 1,
        label: "List item 1",
        parent_id: 0,
        children: [
          { id: 5, label: "List item 5", parent_id: 1 },
          { id: 6, label: "List item 6", parent_id: 1 },
          {
            id: 7,
            label: "List item 7",
            parent_id: 1,
            children: [
              { id: 8, label: "List item 8", parent_id: 7 },
              { id: 9, label: "List item 9", parent_id: 7 },
            ],
          },
        ],
      },
      { id: 2, label: "List item 2", parent_id: 0 },
      { id: 3, label: "List item 3", parent_id: 0 },
      { id: 4, label: "List item 4", parent_id: 0 },
    ],
  };

  render() {
    return (
      <div>
        {this.state.data.map((item) => (
          <Item data={item} key={item.id} />
        ))}
      </div>
    );
  }
}

export default SecondList;
