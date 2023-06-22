import { useState, useEffect } from "react"; //hooks - useState e useEffect

import "./styles.css";

import { Card, ICardProps } from "../../components/Card";

interface IProfileResponse {
    name: string;
    avatar_url: string;
}

interface IUser {
    name: string;
    avatar: string;
}

export function Home() {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [students, setStudents] = useState<ICardProps[]>([]);
    const [studentName, setStudentName] = useState<string>("");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://api.github.com/users/sammduarte");
            const data = await response.json() as IProfileResponse;

            setUser({
                name: data.name,
                avatar: data.avatar_url,
            });
        }

        fetchData();
    }, []);

    function handleAddStudent() {
        const newStudent = {
            name: studentName,
            time: new Date().toLocaleTimeString("Pt-Br", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }),
        };

        setStudents((prevState) => [...prevState, newStudent]); // (...) stringOperator - 
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
                onChange={(e) => { setStudentName(e.target.value)}}
            />
            <button
                disabled={!studentName}
                onClick={handleAddStudent}
            >
                Adicionar
            </button>

            {students.map((student) => ( // .map é usado para fazer um loop no array e é utilizado para retornar alguma coisa (toda vez que for usado, precisamos passar a propriedade "key" prop)
                <Card key={student.time} name={student.name} time={student.time} /> // precisamos garantir que essa "key" será única!
            ))}
        </div>
    )
}
