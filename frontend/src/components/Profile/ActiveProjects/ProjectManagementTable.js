import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import LoginSuggestion from '../../LoginSuggestion';
import { useParams } from 'react-router-dom';
import AddTaskForm from './AddTaskForm';
import { formatDate } from '../../../Functions/formatDate';
import SingleTaskManagement from './SingleTaskManagement';

const Task = ({task, project}) => {
    return (
        <Box sx={{ padding: '0.3rem', display: 'flex', justifyContent: 'space-between' }}>
            <Box>
            <Typography sx={{ fontSize: '0.8rem' }}>{task.content}</Typography>
            <Typography sx={{ fontSize: '0.7rem' }}>{formatDate(task.timeStamp)}</Typography>
            </Box>
            <SingleTaskManagement project={project} task={task}/>
        </Box>
    )
}

const ProjectManagementTable = () => {
    const user = useSelector(({ user }) => user);
    const { id } = useParams();

    const project = useSelector(({ activeProjects }) => activeProjects).find(p => p.id === id);

    if (!user) {
        return <LoginSuggestion />;
    }

    if (!project) {
        return null;
    }

    const doneTasks = project.tasks.filter(t => t.taskState === 'done')
    const waitingTasks = project.tasks.filter(t => t.taskState === 'waiting')
    const rejectedTasks = project.tasks.filter(t => t.taskState === 'rejected')
    const doingTasks = project.tasks.filter(t => t.taskState === 'doing')
    const todoTasks = project.tasks.filter(t => t.taskState === 'todo')

    const paperStyling = {
        borderRadius: '0.5rem',
        padding: '0.5rem',
        width: '15rem',
        height: '25rem',
        marginX: '0.5rem'
    }

    return (
        <Box sx={{ marginTop: '5rem', minHeight: '80vh' }}>
            <Typography>Hallitse projektia: {project.title}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
            gap: '1rem', marginY: '2rem' }}>
            <Paper elevation={3} sx={ paperStyling }>
            <Typography>Odottaa</Typography>
            <AddTaskForm state={'waiting'} project={project}/>
            {waitingTasks && waitingTasks.length > 0 ? (
                waitingTasks.map(task => (
                    <Paper key={task.id} sx={{ my: 1 }}>
                        <Task task={task} project={project}/>
                    </Paper>
                ))
            ): null}
            </Paper>
            <Paper elevation={3} sx={ paperStyling }>
                <Typography>Todo</Typography>
                <AddTaskForm state={'todo'} project={project}/>
            {todoTasks && todoTasks.length > 0 ? (
                todoTasks.map(task => (
                    <Paper key={task.id} sx={{ my: 1 }}>
                        <Task task={task} project={project}/>
                    </Paper>
                ))
            ): null}
            </Paper>
            <Paper elevation={3} sx={ paperStyling }>
                <Typography>Doing</Typography>
                <AddTaskForm state={'doing'} project={project}/>
            {doingTasks && doingTasks.length > 0 ? (
                doingTasks.map(task => (
                    <Paper key={task.id} sx={{ my: 1 }}>
                        <Task task={task} project={project}/>
                    </Paper>
                ))
            ): null}
            </Paper>
            <Paper elevation={3} sx={ paperStyling }>
                <Typography>Done</Typography>
                <AddTaskForm state={'done'} project={project}/>
            {doneTasks && doneTasks.length > 0 ? (
                doneTasks.map(task => (
                    <Paper key={task.id} sx={{ my: 1 }}>
                        <Task task={task} project={project}/>
                    </Paper>
                ))
            ): null}
            </Paper>
            <Paper elevation={3} sx={ paperStyling }>
                <Typography>Hylätty</Typography>
                <AddTaskForm state={'rejected'} project={project}/>
            {rejectedTasks && rejectedTasks.length > 0 ? (
                rejectedTasks.map(task => (
                    <Paper key={task.id} sx={{ my: 1 }}>
                        <Task task={task} project={project}/>
                    </Paper>
                ))
            ): null}
            </Paper>
            </Box>
        </Box>
    );
};

export default ProjectManagementTable;
