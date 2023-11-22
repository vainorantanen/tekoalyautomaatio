import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Divider, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LoginSuggestion from '../../LoginSuggestion';
import { useParams } from 'react-router-dom';
import AddTaskForm from './AddTaskForm';
import { formatDate } from '../../../Functions/formatDate';
import SingleTaskManagement from './SingleTaskManagement';
import { useNotification } from '../../../hooks';
import { modifyProjectCompletionState } from '../../../reducers/activeProjects';
import { socket } from '../../../socket';
import activeProjects from '../../../services/activeProjects';

const Task = ({task, project, setTasks}) => {
    return (
        <Box sx={{ padding: '0.3rem', display: 'flex', justifyContent: 'space-between' }}>
            <Box>
            <Typography sx={{ fontSize: '0.8rem' }}>{task.content}</Typography>
            <Typography sx={{ fontSize: '0.7rem' }}>{formatDate(task.timeStamp)}</Typography>
            </Box>
            <SingleTaskManagement project={project} task={task} setTasks={setTasks}/>
        </Box>
    )
}

const ProjectManagementTable = () => {
    const user = useSelector(({ user }) => user);
    const { id } = useParams();

    const [tasks, setTasks] = useState([]);

    const dispatch = useDispatch()
    const notify = useNotification()

    const project = useSelector(({ activeProjects }) => activeProjects).find(p => p.id === id);

    useEffect(() => {
        const fetchData = async () => {
            socket.emit('join_room', id);
            
            try {
                const projectData = await activeProjects.getAll();
                
                const projectDataFromDb = projectData.find(c => c.id === id);
                if (projectDataFromDb) {
                    setTasks(projectDataFromDb.tasks);
                }
            } catch (error) {
                console.error("Error fetching tasks data:", error);
            }
        };
        
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        socket.on("receive_tasks", (data) => {
          setTasks(data.tasks)
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [socket]);

    if (!user) {
        return <LoginSuggestion />;
    }

    if (!project) {
        return null;
    }

    const handleMarkProjectDone = async () => {
        const confirmed = window.confirm(`Vahvistetaanko muutos?`)
        if (!confirmed) {
          return // If the user clicks "Cancel," do nothing
        }

        try {
            const result = await dispatch(modifyProjectCompletionState(project))
            if (result && result.error) {
                notify(result.error.response.data.error, 'error')
                return
              } else {
                notify('Tila muokattu onnistuneesti', 'success')
              }
        } catch (error) {
            notify('Ilmeni jokin ongelma', 'error')

        }
    }

    const doneTasks = tasks.filter(t => t.taskState === 'done')
    const waitingTasks = tasks.filter(t => t.taskState === 'waiting')
    const rejectedTasks = tasks.filter(t => t.taskState === 'rejected')
    const doingTasks = tasks.filter(t => t.taskState === 'doing')
    const todoTasks = tasks.filter(t => t.taskState === 'todo')

    const paperStyling = {
        borderRadius: '0.5rem',
        padding: '0.5rem',
        width: '15rem',
        height: '25rem',
        marginX: '0.5rem',
        overflowY: 'auto',
    }

    return (
        <Box sx={{ marginTop: '5rem', minHeight: '80vh' }}>
            <Typography>Hallitse projektia: {project.title}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
            gap: '1rem', marginY: '2rem' }}>
            <Paper elevation={3} sx={ paperStyling }>
            <Typography>Odottaa</Typography>
            <AddTaskForm state={'waiting'} project={project} setTasks={setTasks}/>
            {waitingTasks && waitingTasks.length > 0 ? (
                waitingTasks.map(task => (
                    <Paper key={task.id} sx={{ my: 1 }}>
                        <Task task={task} project={project} setTasks={setTasks}/>
                    </Paper>
                ))
            ): null}
            </Paper>
            <Paper elevation={3} sx={ paperStyling }>
                <Typography>Todo</Typography>
                <AddTaskForm state={'todo'} project={project} setTasks={setTasks}/>
            {todoTasks && todoTasks.length > 0 ? (
                todoTasks.map(task => (
                    <Paper key={task.id} sx={{ my: 1 }}>
                        <Task task={task} project={project} setTasks={setTasks}/>
                    </Paper>
                ))
            ): null}
            </Paper>
            <Paper elevation={3} sx={ paperStyling }>
                <Typography>Doing</Typography>
                <AddTaskForm state={'doing'} project={project} setTasks={setTasks}/>
            {doingTasks && doingTasks.length > 0 ? (
                doingTasks.map(task => (
                    <Paper key={task.id} sx={{ my: 1 }}>
                        <Task task={task} project={project} setTasks={setTasks}/>
                    </Paper>
                ))
            ): null}
            </Paper>
            <Paper elevation={3} sx={ paperStyling }>
                <Typography>Done</Typography>
                <AddTaskForm state={'done'} project={project} setTasks={setTasks}/>
            {doneTasks && doneTasks.length > 0 ? (
                doneTasks.map(task => (
                    <Paper key={task.id} sx={{ my: 1 }}>
                        <Task task={task} project={project} setTasks={setTasks}/>
                    </Paper>
                ))
            ): null}
            </Paper>
            <Paper elevation={3} sx={ paperStyling }>
                <Typography>Hylätty</Typography>
                <AddTaskForm state={'rejected'} project={project} setTasks={setTasks}/>
            {rejectedTasks && rejectedTasks.length > 0 ? (
                rejectedTasks.map(task => (
                    <Paper key={task.id} sx={{ my: 1 }}>
                        <Task task={task} project={project} setTasks={setTasks}/>
                    </Paper>
                ))
            ): null}
            </Paper>
            </Box>
            <Divider sx={{ my:2 }} />
            <Box sx={{ textAlign: 'center', my: 2 }}>
                <Typography variant='h6'>Onko projekti valmis?</Typography>
                <Button variant='contained' sx={{ my: 2 }}
                onClick={handleMarkProjectDone}>Aseta projekti tilaan: Valmis</Button>
                {project.isCompletedByCustomer ? (
                    <Typography>Asiakas on hyäksynyt projektin valmiiksi</Typography>
                ): <Typography>Asiakas ei ole hyväksynyt vielä projektia valmiiksi</Typography>}
                {project.isCompletedByDev ? (
                    <Typography>Kehittäjä on hyäksynyt projektin valmiiksi</Typography>
                ): <Typography>Kehittäjä ei ole hyväksynyt vielä projektia valmiiksi</Typography>}
            </Box>
            <Divider sx={{ my:2 }} />
        </Box>
    );
};

export default ProjectManagementTable;
