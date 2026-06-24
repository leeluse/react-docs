import { Component } from 'react';
import LifeCycleSample from './LifeCycleSample';
type Props = object

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}


interface State {
  number?: number;
  color: string | null;
}

// 마운트
export default class Example extends Component<Props, State>  {
  state: State = {
    color: '#000000',
  }

  handleClick = () => {
    this.setState({
        color: getRandomColor()
    })
  }

  render() {
    return (
      <div className="p-6 border border-white/5 shadow-sm rounded-lg mb-20 ">
        <div className="flex gap-4 items-center mb-6">
          <button 
            onClick={this.handleClick}
            className="px-2 py-1 bg-purple-600 hover:bg-purple-500 text-sm text-white rounded-md shadow-md transition duration-200 ease-in-out transform cursor-pointer"
          >
            랜덤 색상 변경
          </button>
          <span className="text-sm text-slate-400">현재 Props 색상 : 
            <span className="ml-2 text-md text-white px-2 py-1 rounded bg-black/40" style={{ color: this.state.color || '#fff' }}>
              {this.state.color}
            </span>
          </span>
        </div>
        <div className="border-t border-white/10 pt-3">
          <LifeCycleSample color={this.state.color} />
        </div>
      </div>
    )
  }
}