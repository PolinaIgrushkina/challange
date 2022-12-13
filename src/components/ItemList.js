import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { itemsFetchData } from "../actions/items";

const Item = ({ data }) => {
  const { id, label, parent_id, children } = data;

  return (
    <ul>
      <li style={{ paddingLeft: 10 }}>{label}</li>
      {children && children.map((item) => <Item data={item} key={item.id} />)}
    </ul>
  );
};

class ItemList extends Component {
  componentDidMount() {
    this.props.fetchData("http://5af1eee530f9490014ead8c4.mockapi.io/items");
  }

  render() {
    const newArr = this.props.items.map((item) => {
      return { ...item, children: [] };
    });

    const data = newArr.filter((item) => {
      return !(
        item.parent_id && newArr[item.parent_id - 1].children.push(item)
      );
    });

    return (
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <ul>
          {this.props.items.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>

        <ul>
          {data.map((item) => (
            <Item data={item} key={item.id} />
          ))}
        </ul>
      </div>
    );
  }
}

ItemList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
