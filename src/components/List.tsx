import React from "react";
import "./List.css"

interface ListItemProperties<T> {
  item: T
  factory: (item: T) => JSX.Element
}

interface ListProperties<T> {
  items: T[]
  factory: (item: T) => JSX.Element
  horizontal?: boolean
}

class ListItem<T> extends React.Component<ListItemProperties<T>, any> {
  constructor(props: ListItemProperties<T>) {
    super(props);
  }

  render = () => {
    return (
      <div>
        {this.props.factory(this.props.item)}
      </div>
    )
  }
}

export default class List<T> extends React.Component<ListProperties<T>, any> {
  constructor(props: ListProperties<T>) {
    super(props);
  }

  render = () => {
    let listItems: JSX.Element[] = [];
    for (const item of this.props.items) {
      listItems.push(<ListItem item={item} factory={this.props.factory}/>)
    }

    let className = this.props.horizontal ? "horizontal" : ""

    return (
      <div className={className}>
        {listItems}
      </div>
    )
  }
}