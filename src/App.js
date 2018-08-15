import React, { Component } from 'react';
import Form from './components/Form';
import TodoListTemplate from './components/TodoListTemplate';
import TodoItemList from './components/TodoItemList';
import { Map, List } from 'immutable';

class App extends Component {
  id = 3
  state = {
    data: Map({
      input : '',
      todos : List([
        Map({
          id: 0, text: ' 리액트 소개', checked: false
        }),
        Map({
          id: 1, text: ' 안녕', checked: true 
          }),
        Map({ 
          id: 2, text: ' 리액트 소개', checked: false 
        })
      ])
    })
  }
      
  handleChange = (e) => { // input box의 value 값이 바뀌는 event가 발생할 때마다
    const { value } = e.target;
    const { data } = this.state;
    this.setState({
      data: data.set('input', value) // input 의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const { data } = this.state;
    this.setState({
      data: data.set('input', '').
      update('todos', todos => todos.push(Map({
        id: this.id++, text: data.get('input'), checked: false
      })))
    });
  }

  // handleCreate = () => {
  //   const { data } = this.state;
  //   this.setState({
  //     input: '', // 인풋 비우고
  //     // concat 을 사용하여 배열에 추가
  //     todos: todos.concat({
  //       id: this.id++,
  //       text: input,
  //       checked: false
  //     })
  //   });
  // }
    
  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 발생
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }



  handleToggle = (id) => {

    // index에 해당하는 item의 버튼을 조작
    const { data } = this.state;
    const index = data.get('todos').findIndex(todo => todo.get('id') === id);

    const updatedItem = data.get('todos').get(index).update('checked', checked => checked === 'true' ? 'false' : 'true');
    this.setState({
      data: {updatedItem}
    });


  }

  handleRemove = (id) => {
    const { data } = this.state;
    this.setState({
      data: {
        input: data.get('input'),
        todos: data.get('todos').filter(todo => todo.id !== id)
      }
    });
  }
    
  render() {
    const { data } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;

    //FIX!!!!!!!!!!!
    const input = data.get('input');
    const todos = data.get('todos');


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




