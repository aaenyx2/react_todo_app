import React, { Component } from 'react';
import TodoItem from './TodoItem';
import { Map, List } from 'immutable';



class TodoItemList extends Component {
    
    //todos.map 코드에서 Props 값을 읽어들일 때, 비동기적으로 데이터를 처리할 때,
    // 데이터가 불러지기 전에 컴포넌트들은 무조건 한 번 렌더링된다. 이 때, todo가 undefined이기 때문에
    // map of undefined 라는 오류가 발생한다. 이를 없애기 위해 todos 의 값을 초기화해줄 필요가 있다 
    static defaultProps={
        todos: List([])
    };

    render() {
        
    
        const {todos, onToggle, onRemove} = this.props;
        const todoList = todos.map(
            (todo) => (
                <TodoItem
                    id={todo.get('id')}
                    text={todo.get('text')}
                    checked={todo.get('checked')}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={todo.get('id')}
                />
            )
        );
        
        return(
            <div>
                {todoList}
            </div>
        );
    }
}

export default TodoItemList
    
