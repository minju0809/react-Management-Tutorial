import "./App.css";
import Customer from "./components/Customer";

const customers = [
  {
    id: 1,
    // 랜덤으로 이미지를 보여주는 기능을 수행하는 웹사이트, 크기 64*64
    image: "https://placeimg.com/64/64/1",
    name: "가나다",
    birthday: "910000",
    gender: "남자",
    job: "대학생",
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "라마바",
    birthday: "910000",
    gender: "남자",
    job: "프로그래머",
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/3",
    name: "사아자",
    birthday: "910000",
    gender: "남자",
    job: "디자이너",
  },
];

function App() {
  return (
    <div>
      {customers.map((c) => {
        return <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />;
      })}
    </div>
  );
}

export default App;
