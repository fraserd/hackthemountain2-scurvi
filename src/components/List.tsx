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

  render = () => this.props.factory(this.props.item)
}

export default class List<T> extends React.Component<ListProperties<T>, any> {
  constructor(props: ListProperties<T>) {
    super(props);
  }

  render = () => {
    let listItems: JSX.Element[] = [];
    let i: number = 1
    for (const item of this.props.items) {
      listItems.push(<ListItem key={i++} item={item} factory={this.props.factory}/>)
    }

    let className = this.props.horizontal ? "horizontal" : ""

    return (
      <div className={className}>
        {listItems}
      </div>
    )
  }
}