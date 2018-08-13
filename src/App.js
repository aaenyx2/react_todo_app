import React, { Component } from 'react';
import Form from './components/Form';
import TodoListTemplate from './components/TodoListTemplate';
import TodoItemList from './components/TodoItemList';

class App extends Component {
  id = 3
  state = {
    input: '',
    todos: [
      { id: 0, text: ' 리액트 소개', checked: false },
      { id: 1, text: ' 리액트 소개', checked: true },
      { id: 2, text: ' 리액트 소개', checked: false }
    ]
  }

      
  handleChange = (e) => { // input box의 value 값이 바뀌는 event가 발생할 때마다
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }
    
  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '', // 인풋 비우고
      // concat 을 사용하여 배열에 추가
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  }
    
  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 발생
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    // index에 해당하는 item의 버튼을 조작
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos]; // 배열을 복사
    // Todo array의 해당 index 값을 덮어쓰기 한 뒤 이 array을 setState로 State에 반영
    nextTodos[index] = { 
      ...selected, 
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({todos: todos.filter(todo => todo.id !== id)})
  }
    
  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      onRemove,
      handleRemove
    } = this;


    return (
      <TodoListTemplate form={(
        <Form value={input} onKeyPress={handleKeyPress} 
        onChange={handleChange} onCreate={handleCreate}/>
        )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
      </TodoListTemplate>
    );
  }






}

export default App;




