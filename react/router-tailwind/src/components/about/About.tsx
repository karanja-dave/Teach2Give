import taskManager from '../../assets/images/tasks-manager.png'
import { Navbar } from '../nav/Navbar'

export const About = () => {
  return (
    <div>
      <Navbar/>
        <div>
            <img src={taskManager} alt="Task manager image" />
        </div>

        <div>
            <h1>About Todo App</h1>
            <p>Todo Pro s a powerful task management service designed to enhance creativity</p>
            <p>With TodoPro, you can easily  create, assign and track tasks, esnuring  that your team stays  organied and focused on what matters most.</p>
            <p>whether you are managing small tasks or large teams to , TodoPro provides  the tools you need to succeed</p>

        </div>
        
    </div>

    
  )
}
