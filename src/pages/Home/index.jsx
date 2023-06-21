import { useState, useEffect } from "react"; //hooks - 

import { Card } from "../../components/Card";

import "./styles.css"

export function Home() {
    const [user, setUser] = useState({ name: "", avatar: "" })
    const [studentName, setStudentName] = useState("");
    const [students, setStudents] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://api.github.com/users/sammduarte")
            const data = await response.json()

            setUser({
                name: data.name,
                avatar: data.avatar_url
            })
        }

        fetchData()
    }, [])

    function handleAddStudent() {
        if (!studentName) {
            alert("O nome precisa ser preenchido!")
            return;
        }

        const newStudent = {
            name: studentName,
            time: new Date().toLocaleTimeString("Pt-Br", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            })
        }

        setStudents([...students, newStudent]) // (...) stringOperator - 
    }

    return (
        <div className="container">
            <header>
                <h1>Lista de Presença</h1>

                <div>
                    <strong>{user.name}</strong>
                    <img src={user.avatar} alt="Avatar" />
                </div>
            </header>

            <input
                type="text"
                placeholder="Digite o nome aqui..."
                onChange={(e) => { setStudentName(e.target.value) }}
            />
            <button onClick={handleAddStudent}>Adicionar</button>

            {students.map((student) => ( // .map é usado para fazer um loop no array e é utilizado para retornar alguma coisa (toda vez que for usado, precisamos passar a propriedade "key" prop)
                <Card key={student.time} name={student.name} time={student.time} /> // precisamos garantir que essa "key" será única!
            ))}
        </div>
    )
}
