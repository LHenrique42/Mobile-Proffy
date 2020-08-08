import React, { useState } from 'react'
import { View, Text } from 'react-native';
import PageHeader from '../../components/PageHeader';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { Feather } from '@expo/vector-icons'
import api from '../../services/api';

import styles from './styles';

function TeacherList() {

    const [ isFiltersVisible, setIsFiltersVisible ] = useState(false);
    
    const [ subject, setSubject ] = useState('');
    const [ week_day, setWeekDay ] = useState('');
    const [ time, setTime ] = useState('');
    const [ teachers, setTeachers ] = useState([]);

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }
    
    async function handleFiltersSubmit() {
        const response = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
        setIsFiltersVisible(false);
    }

    return (
        <View 
            style={styles.container}
        >
            <PageHeader 
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton
                        onPress={handleToggleFiltersVisible}
                    >
                        <Feather 
                            name="filter"
                            size={24}
                            color="#FFF"                            
                        />
                    </BorderlessButton>
                )}
            >
                
                { isFiltersVisible && (
                    <View 
                        style={styles.searchForm}
                    >
                        <Text 
                            style={styles.label}
                        >
                            Matéria
                        </Text>
                        <TextInput
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            style={styles.input}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                        />

                        <View 
                            style={styles.inputGroup}
                        >
                            <View 
                                style={styles.inputBlock}
                            >
                                <Text 
                                    style={styles.label}
                                >
                                    Dia da semana
                                </Text>
                                <TextInput
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    style={styles.input}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>
                            <View 
                                style={styles.inputBlock}
                            >
                                <Text 
                                    style={styles.label}
                                >
                                    Horário
                                </Text>
                                <TextInput
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    style={styles.input}
                                    placeholder="Qual horário?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>
                        </View>

                        <RectButton 
                            style={styles.submitButton}
                            onPress={handleFiltersSubmit}
                        >
                            <Text style={styles.submitButtonText}>
                                Filtrar
                            </Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return  <TeacherItem
                                key={teacher.id} 
                                teacher={teacher}
                            />

                })}
                </ScrollView>
        </View>
    )
}

export default TeacherList;