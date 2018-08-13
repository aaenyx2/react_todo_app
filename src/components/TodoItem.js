import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {

    // 컴포넌트 최적화  
    shouldComponentUpdate(nextProps, nextState) { // 리렌더링을 할지 말지 정하는 라이프 사이클 메소드. 평상시엔 true
        return this.props.checked !== nextProps.checked;
    }

    render() {
const { text, checked, id, onToggle, onRemove } = this.props;
return (
    <div className="todo-item" onClick={() => onToggle(id)}>
    <div className="remove" onClick={(e) => {
        e.stopPropagation(); // onToggle 이 실행되지 않도록 함
        onRemove(id)}
    }>&times;</div>
    <div className={`todo-text ${checked && 'checked'}`}>
        <div>{text}</div>
    </div>
    {
        checked && (<div className="check-mark">✓</div>)
    }
    </div>
);
}
}

export default TodoItem;