import CodeBlock from '../components/CodeBlock'

const EXAMPLE_1 = `
import React from 'react'

export default const App = () => {
    return (
         <Example name='리액트' />
    )
}
... 
export default const Example = props => {
    return (
        <div>{props.name}</div> // 리액트
    )
}
`
const EXAMPLE_2 = `
import React from 'react'
export default const App = () => {
    return (
         <Example />
    )
}
... 
export default const Example = props => {
  return (
    <div>{props.name}</div> // 리액트
  )
}

Example.defaultProps = {
  name: '리액트'
}
`
const EXAMPLE_3 = `
    export default const App = () => {
    return 
        <Example>리액트 Children</Example>
    }

    export default const Example = props => {
        return (
            <div>
                안녕하세요 제 이름은 {props.name}입니다. // 안녕하세요 제 이름은 리액트입니다.
                이것은 {props.children}입니다. // 이것은 리액트 Children입니다.
            </div>
        )
    }

    Example.defaultProps = {
        name: '리액트'
    }
`
const EXAMPLE_4 = `
    export default const App = () => {
    return 
        <Example>리액트 Children</Example>
    }

    export default const Example = props => {
        const { name, children } = props;
        return (
            <div>
                안녕하세요 제 이름은 {props.name}입니다. // 안녕하세요 제 이름은 리액트입니다.
                이것은 {props.children}입니다. // 이것은 리액트 Children입니다.
            </div>
        )
    }

    Example.defaultProps = {
        name: '리액트'
    }
`
const EXAMPLE_5 = `\
    import PropTypes from 'prop-types'

    export default const Example = props => {
        return (...) // props.name 사용 시 에러 발생
    }

    Example.defaultProps = {
        name: 3
    }
    
    Example.propTypes = {
        name: PropTypes.string
    }
`
const EXAMPLE_6 = `\
    import PropTypes from 'prop-types

    export default const Example = ({name, age}) => {
        return (
            <div>name: {name}, age: {age}</div> // props.age가 undefined로 출력되어 에러 발생
    }
        ) 

    Example.defaultProps = {
        name: '이름'
    }
    
    Example.propTypes = {
        name: PropTypes.string
        age: PropTypes.number.isRequired // age를 isRequired로 설정함
    }
`

const EXAMPLE_7 = `\
    const Example extends Component {
        static defaultProps = {
            name: '이름'
        }   
        static propTypes = {
            name: PropTypes.string
            age: PropTypes.number.isRequired
        }
        render() {
            const { name, age } = this.props
            return <div>{name}, {age}</div>
        }
    
    }
`

export default function Props() {
  return (
    <section className="flex flex-col m-5 gap-10 py-25">
      <h1 className="text-[45px] font-bold text-white"># Props</h1>
      <article>
        <h3 className="text-2xl font-bold text-primary py-2.5 ">Props란?</h3>
        <div className="border-l-2 border-base-border pl-6 py-2">
          <p>Props는 Properties를 줄인 표현으로, 컴포넌트 속성을 설정할 때 사용하는 요소이다.</p>
          <p>
            props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정해서 자식 컴포넌트에게
            내려 준다.
          </p>
        </div>
      </article>
      <article className="flex gap-10">
        <section className="flex-1">
          <p className="font-semibold text-lg text-white pb-3">• 컴포넌트로 Props 전달하기</p>
          <span>
            App.jsx에서 Example 컴포넌트로 props를 지정할 경우, 자식 컴포넌트인 Exmaple에서 해당
            프로퍼티에 접근 가능함
          </span>
          <CodeBlock content={EXAMPLE_1} />
        </section>
        <section className="flex-1">
          <p className="font-semibold text-lg text-white pb-3">• Default Props 설정하기</p>
          <span>
            부모 컴포넌트에서 props를 지정해 내려 주지 않아도, 현재 컴포넌트에서 default Props를
            지정할 경우 해당 값을 반환함
          </span>
          <CodeBlock content={EXAMPLE_2} />
        </section>
      </article>
      <article className="flex-1">
        <p className="font-semibold text-lg text-white pb-3">• 태그 사이 Children 지정하기</p>
        <span>컴포넌트 태그 사이의 내용을 보여 주는 props가 있는데, 이것이 Children이다.</span>
        <CodeBlock content={EXAMPLE_3} />
        <p className="pb-3">
          Example 컴포넌트 사이에 작성한 문자열을 props.children으로 전달해서, 이것을 받은 Example
          컴포넌트에서
          <span className="text-white bg-slate-700 p-1 rounded-md mx-1 ">
            이것은 리액트 Children입니다.
          </span>
          가 출력됨
        </p>
      </article>
      <article className="flex-1">
        <p className="font-semibold text-lg text-white pb-3">
          • 비구조화 할당 문법으로 Props 값 추출하기
        </p>
        <span>
          props 값을 조회할 때마다
          <span className="text-white bg-purple-500/20 p-1 mx-1  rounded-md">props.name</span>,
          <span className="text-white bg-purple-500/20 p-1  mx-1 rounded-md">props.children</span>과
          props 키워드를 앞에 붙여 주지 않고, props를 구조 분해 할당하는 방식으로 추출할 수 있다.
        </span>
        <CodeBlock content={EXAMPLE_4} />
        <p className="pb-3">
          위처럼 객체에서 값을 출력하는 문법을 비구조화 할당, 구조 문해 문법이라고 부름
        </p>
        <div className="border-l-2 border-blue-300/50 pl-6 py-2">
          <p className="pb-2 text-blue-300/50">
            함수의 파라미터 부분에서도 사용 가능하고, 만약 해당 함수 파라미터가 객체라면 그것을
            비구조화해서 사용하는 것이다.
          </p>
          <p className="bg-slate-800 w-1/2 p-2 rounded-md">{`const name = ({name, children}) => {}   // props를 받을 때 바로 구조 분해 `}</p>
        </div>
      </article>
      <article>
        <h3 className="text-2xl font-bold text-primary py-2.5">Props 검증</h3>
        <div className="py-3">
          <p className="font-semibold text-lg text-white pb-3">• PropTypes로 타입 지정하기</p>
          <p>컴포넌트의 필수 props를 지정하거나 props의 type을 지정할 때는 propTypes을 사용한다</p>
          <p>propTypes을 설정하는 방법은 defaultProps을 설정하는 것과 매우 유사하다</p>
          <CodeBlock content={EXAMPLE_5} />
        </div>
        <div className="py-3">
          <p className="font-semibold text-lg text-white p-3">
            • isRequired를 사용해서 propTypes 지정
          </p>
          <p>
            propTypes를 지정하지 않았을 경우 경고 메세지를 띄워 주고 싶다면 isRequired를 사용하면
            된다
          </p>
          <CodeBlock content={EXAMPLE_6} />
        </div>
        <div>
          <p className="font-semibold text-lg text-white p-3">• 클래스형 컴포넌트에서 props 사용</p>
          <p>클래스형 컴포넌트에서 props 사용 시에는 render 함수로 this.props를 조회할 수 있다</p>
          <p>defaultProps, propTypes는 동일하게 설정하면 된다</p>
          <CodeBlock content={EXAMPLE_7} />
        </div>
      </article>
    </section>
  )
}
