import { Component } from 'react';

interface Props {
  color: string | null;
}

interface State {
  number?: number;
  color?: string | null;
}

class LifeCycleSample extends Component<Props, State> {
  state: State = {
    number: 0,
    color: null,
  };
  myRef: HTMLDivElement | null = null;

  // constructor 메소드
  constructor(props: Props) {
    super(props);
    console.log('🟢 [Mount Phase] constructor - 컴포넌트 인스턴스 생성 및 초기화 완료');
  }

  // getDerivedStateFromProps 메소드
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    console.log('🔍 [Mount & Update Phase] getDerivedStateFromProps - Props 데이터를 State와 동기화 시도', { nextProps, prevState });
    if (nextProps.color !== prevState.color) {
      console.log(`   ➡️ props 색상(${nextProps.color})과 state 색상(${prevState.color})이 다르므로 state를 동기화합니다.`);
      return { color: nextProps.color };
    }
    console.log('   ➡️ 색상 변경이 없으므로 state를 업데이트하지 않습니다.');
    return null;
  }

  // componentDidMount 메소드
  componentDidMount() {
    console.log('✨ [Mount Phase] componentDidMount - 컴포넌트 첫 렌더링 후 DOM 마운트 완료');
  }

  // shouldComponentUpdate 메소드
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const shouldUpdate = nextState.number !== undefined && nextState.number % 10 !== 4;
    console.log(`🤔 [Update Phase] 1. shouldComponentUpdate - 리렌더링 여부 판단 (결과: ${shouldUpdate})`, {
      currentProps: this.props,
      currentState: this.state,
      nextProps,
      nextState
    });
    if (!shouldUpdate) {
      console.log('   🚫 number의 마지막 자리가 4이므로 리렌더링(render)을 건너뜁니다.');
    }
    return shouldUpdate;
  }

  // componentWillUnmount 메소드
  componentWillUnmount() {
    console.log("🧹 [Unmount Phase] componentWillUnmount - 컴포넌트가 DOM에서 제거되기 직전 정리 작업 실행");
  }

  handleClick = () => {
    this.setState({
      number: (this.state.number ?? 0) + 1
    });
  };

  getSnapshotBeforeUpdate(prevProps: Props) {
    console.log("📸 [Update Phase] 2. getSnapshotBeforeUpdate - 브라우저 DOM 반영 직전의 DOM 스타일 색상 캡처");
    if (prevProps.color !== this.props.color) {
      const prevDOMColor = this.myRef ? this.myRef.style.color : null;
      console.log(`   ➡️ 업데이트 직전 DOM의 실제 색상(${prevDOMColor})을 스냅샷으로 캡처합니다.`);
      return prevDOMColor;
    }
    return null;
  }

  componentDidUpdate(prevProps: Props, prevState: State, snapshot: string | null) {
    console.log("📢 [Update Phase] 3. componentDidUpdate - 실제 브라우저 DOM 업데이트 및 리렌더링 완료", {
      prevProps,
      prevState,
      snapshot
    });
    if (snapshot) {
      console.log(`   💡 snapshot 데이터 확인: 업데이트 직전 색상은 "${snapshot}" 이었습니다.`);
    }
  }

  render() {
    console.log("🎨 [Render] render - 컴포넌트 모양(HTML 구조) 결정 및 가상 DOM 렌더링");
    const style = {
      color: this.props.color || undefined
    };

    return (
      <div ref={ref => { this.myRef = ref; }} className="flex flex-col gap-1 text-slate-300">
        <h3 className="text-md font-extrabold transition-colors duration-300" style={style}>
          부모로부터 온 Props Color: {this.props.color}
        </h3>
        <div className='flex flex-col border-l-2 pl-3 my-2 border-slate-500'>
          <p className="text-sm">State Color (Derived): <span className="font-mono text-white px-1.5 py-0.5 rounded bg-black/30">{this.state.color}</span></p>
          <p className="text-sm">State Number: <span className="font-semibold">{this.state.number ?? 0}</span></p>
        </div>
        <button 
          onClick={this.handleClick}
          className="mt-2 w-fit px-3 py-1 text-sm  hover:bg-white/20 text-slate-200 border border-slate-700 font-medium rounded-md shadow transition duration-150 cursor-pointer"
        >
          더하기 (number + 1)
        </button>
        <p className="text-xs text-amber-400/80 mt-3">
          * number가 10으로 나눈 나머지가 4인 경우 (예: 4, 14...) shouldComponentUpdate가 false를 반환하여 렌더링이 되지 않습니다.
        </p>
      </div>
    );
  }
}

export default LifeCycleSample;

