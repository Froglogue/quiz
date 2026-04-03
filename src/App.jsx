import { useEffect, useState } from "react";

// ===== 문제 데이터 =====
const allQuestions = [
{id:1,question:"Who’s going to pick up the package?",choices:["At the post office.","Not yet.","I can do it."],answer:2},
{id:2,question:"Which restaurant did you choose for the banquet?",choices:["The rest of our colleagues.","The food was excellent.","King’s Café."],answer:2},
{id:3,question:"What time does your flight leave?",choices:["Stay in the right lane.","Later than I wanted.","At the international terminal."],answer:1},
{id:4,question:"Who should I call about the leaking pipe?",choices:["The property manager handles this.","Sure, I’d like to go there.","During regular business hours."],answer:0},
{id:5,question:"What is the keynote speaker’s presentation about?",choices:["The registration deadline is soon.","Promoting small businesses.","I enjoyed it, too."],answer:1},
{id:6,question:"Who has the copy of the financial report?",choices:["That’s fine with me.","It’s on my desk.","Twelve pages long."],answer:1},
{id:7,question:"What’s causing all the noise upstairs?",choices:["At nine o’clock.","He’s staring out the window.","They’re installing shelves."],answer:2},
{id:8,question:"Which book made the best-sellers list?",choices:["He signed the cover.","Yes, it costs fifteen euros.","The one on display."],answer:2},
{id:9,question:"Who knows how to use the copy machine?",choices:["Twenty-five copies.","John does.","No, he used it all."],answer:1},
{id:10,question:"Which restaurant would you like to go to?",choices:["It’s at seven P.M.","Yes, it’s quite good.","How about the French one?"],answer:2},
{id:11,question:"What did the client say about our design proposal?",choices:["The latest budget numbers.","She was very impressed.","No, not a good sign."],answer:1},
{id:12,question:"Who’s going to the trade show this year?",choices:["Right—I thought so, too.","It’s not until November.","That’s a fair trade."],answer:1},
{id:13,question:"What’s the best way to reach you, Mr. Franklin?",choices:["About ten kilograms.","Try my office number.","I can’t reach it."],answer:1},
{id:14,question:"Which stores are open late tonight?",choices:["They were delayed by the storm.","None of them except the supermarket.","We store them in plastic containers."],answer:1},
{id:15,question:"Who can fill me in on our competitor’s strategy?",choices:["I feel confident about winning.","That is absolutely true.","Joan has all the information."],answer:2},
{id:16,question:"What’s today’s department meeting about?",choices:["No, he was absent.","Didn’t you receive the e-mail?","It costs twelve dollars."],answer:1},
{id:17,question:"Who’s responsible for repairing the broken window in the staff lounge?",choices:["Yes, he responded yesterday.","Let’s call maintenance.","At the next staff meeting."],answer:1},
{id:18,question:"What’s the cover story for this month’s magazine issue?",choices:["The editors are meeting later today to decide.","January, February, and March.","No, Heidi’s having a computer issue."],answer:0},
{id:19,question:"Which of the applicants did Mr. Sohn hire?",choices:["I think we’ll find out today.","Several applications.","I plan to retire."],answer:0},
{id:20,question:"Who was selected as the new director of the fitness center?",choices:["Interviews are scheduled for tomorrow.","I think the smaller size would be better.","It costs 50 dollars per month."],answer:0},

{id:21,question:"When does the sales staff usually arrive?",choices:["Thanks, but the bus is faster.","At eight o’clock.","The prices are very reasonable."],answer:1},
{id:22,question:"Where can I get the shuttle to the conference center?",choices:["Yes, I’ll see you there.","In front of the lobby.","The conference ends at seven."],answer:1},
{id:23,question:"When did you buy a bicycle?",choices:["Just last week.","I have the equipment.","For fifty dollars."],answer:0},
{id:24,question:"Where is the fire escape on this floor?",choices:["It’s near the storage room.","His office is next door.","By calling the fire station."],answer:0},
{id:25,question:"When’s the merger scheduled to take place?",choices:["In three months.","On Fourth Street.","A dentist appointment."],answer:0},
{id:26,question:"Where’s the platform for the express train?",choices:["To the Hoffman building.","On the right side.","In fifteen minutes."],answer:1},
{id:27,question:"When will my order be ready?",choices:["I’d like that.","How soon do you need it?","It’s a shorter one."],answer:1},
{id:28,question:"Where’s that noise coming from?",choices:["Yes, she has a nice voice.","From the fax machine, I think.","He’s coming from work."],answer:1},
{id:29,question:"When did you start your career as a fashion designer?",choices:["That’s correct.","About fifteen years ago.","The fashion magazine."],answer:1},
{id:30,question:"When should we leave for the banquet?",choices:["In the Red Oak Room.","How about six o’clock?","We’re closed for the holiday."],answer:1},
{id:31,question:"Where is the office calendar?",choices:["Ms. Jackson borrowed it.","He went downstairs.","Sometime in mid-July."],answer:0},
{id:32,question:"When was that publishing house established?",choices:["I just started working there.","The publicity manager.","On Baylor Street."],answer:0},
{id:33,question:"Where’s the company retreat going to take place?",choices:["You should speak with Anna.","Some team-building activities.","In the middle of September."],answer:0},
{id:34,question:"When should recommendation letters be sent in?",choices:["I strongly recommend it.","To our corporate headquarters.","No later than July eighth."],answer:2},
{id:35,question:"When is Benjamin going to meet with the new clients?",choices:["He met with them yesterday.","In room thirty-five B.","It lasted the entire day."],answer:0},
{id:36,question:"Where do you plan to go for the holidays?",choices:["We haven’t decided yet.","Yes, that’s the plan.","For two weeks."],answer:0},
{id:37,question:"Where will the candidates’ debate be held?",choices:["Yes, on another date.","I’m voting for Angela Fernandez.","In the Franklin Theater."],answer:2},
{id:38,question:"When were the changes for the proposal submitted?",choices:["To the department mailing list.","It hasn’t been done yet.","That’s what I proposed."],answer:1},
{id:39,question:"When will I receive a confirmation e-mail for my purchase?",choices:["As soon as the order is placed.","To assess its performance.","Perhaps at the post office."],answer:0},
{id:40,question:"Where did you buy your leather jacket?",choices:["It was actually a gift.","Because it’s cold outside.","No, they’re on sale."],answer:0}
];



// ===== 유틸 =====
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickCount(arr, count) {
  return shuffle(arr).slice(0, count);
}

function makeBlanks(sentence) {
  const words = sentence.split(" ");
  const count = Math.floor(Math.random() * 2) + 2;
  const indices = [];

  while (indices.length < count) {
    const i = Math.floor(Math.random() * words.length);
    if (!indices.includes(i)) indices.push(i);
  }

  return words.map((w, i) =>
    indices.includes(i)
      ? { type: "blank", answer: w }
      : { type: "text", value: w }
  );
}

// ===== 문장 렌더 =====
function RenderSentence({ parts, inputs, setInputs, showAnswer, onEnter }) {
  let blankIndex = 0;

  return (
    <div className="flex flex-wrap gap-2 text-xl">
      {parts.map((p, i) => {
        if (p.type === "text") {
          return <span key={i}>{p.value}&nbsp;</span>;
        } else {
          const idx = blankIndex++;
          const wrong = showAnswer && inputs[idx] !== p.answer;

          return (
            <input
              key={i}
              value={showAnswer ? p.answer : inputs[idx] || ""}
              onChange={(e) => {
                if (showAnswer) return;
                const copy = [...inputs];
                copy[idx] = e.target.value;
                setInputs(copy);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") onEnter();
              }}
              className={`w-24 text-center border-b-2 outline-none
                ${wrong ? "border-red-500 text-red-500" : "border-gray-400"}
                focus:border-blue-500`}
            />
          );
        }
      })}
    </div>
  );
}

// ===== 앱 =====
export default function App() {
  const [page, setPage] = useState("home");

  const [mode, setMode] = useState("blank");
  const [count, setCount] = useState(10);

  const [list, setList] = useState([]);
  const [i, setI] = useState(0);
  const [q, setQ] = useState(null);

  const [parts, setParts] = useState([]);
  const [inputs, setInputs] = useState([]);

  const [step, setStep] = useState("blank");
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState(null);

  const [wrongBlanks, setWrongBlanks] = useState([]);
  const [wrongChoices, setWrongChoices] = useState([]);

  const [showResult, setShowResult] = useState(false);

  const [audio, setAudio] = useState(null);
  const newAudio = new Audio(`/audio/${i+1}.mp3`);
  // ===== 시작 =====
  function startQuiz() {
    const picked = pickCount(allQuestions, count);
    setList(picked);
    setI(0);
    setPage("quiz");
  }

  // ===== 문제 세팅 =====
  useEffect(() => {
    if (list.length && i < list.length) {
      const cur = list[i];
      setQ(cur);

      // 🔥 오디오 재생
      if (audio) {
        audio.pause();
      }

      const newAudio = new Audio(`/audio/${cur.id || (i+1)}.mp3`);
      newAudio.play();
      setAudio(newAudio);

      if (mode === "blank") {
        const p = makeBlanks(cur.question);
        setParts(p);
        const blankCount = p.filter(x => x.type === "blank").length;
        setInputs(Array(blankCount).fill(""));
        setStep("blank");
      }

      setShowAnswer(false);
      setSelected(null);
    }
  }, [list, i]);

  function submitBlanks() {
    let correct = true;
    let idx = 0;

    for (let p of parts) {
      if (p.type === "blank") {
        if (inputs[idx] !== p.answer) correct = false;
        idx++;
      }
    }

    if (!correct) {
      setShowAnswer(true);
      setWrongBlanks(prev => [...prev, q]);
    }

    setStep("choice");
  }

  function selectChoice(idx) {
    setSelected(idx);
    setShowResult(true);

    if (idx !== q.answer) {
      setWrongChoices(prev => [...prev, q]);
    }

    setTimeout(() => {
      setShowResult(false);
      setSelected(null);

      if (i + 1 >= list.length) {
        setPage("result");
      } else {
        setI(prev => prev + 1);
      }
    }, 2000);
  }

  // ===== 홈 =====
  if (page === "home") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-sm">
          <h1 className="text-xl font-bold mb-4 text-center">퀴즈 설정</h1>

          <div className="mb-4">
            <p className="mb-2">모드</p>
            <button
              onClick={() => setMode("blank")}
              className={`mr-2 px-3 py-2 rounded ${
                mode === "blank" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              빈칸
            </button>

            <button
              onClick={() => setMode("normal")}
              className={`px-3 py-2 rounded ${
                mode === "normal" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              일반
            </button>
          </div>

          <div className="mb-4">
            <p className="mb-2">문제 수</p>
            {[10,20,30,40].map(n => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`mr-2 px-3 py-2 rounded ${
                count === n ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {n}
            </button>
          ))}
          </div>

          <button onClick={startQuiz} className="w-full py-3 bg-blue-500 text-white rounded-xl">
            시작
          </button>
        </div>
      </div>
    );
  }

  // ===== 결과 =====
  if (page === "result") {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">복습</h1>

        {/* 객관식 오답 */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">객관식 틀린 문제</h2>
          {wrongChoices.length === 0 && <p>없음 🎉</p>}

          {wrongChoices?.map((item, idx) => (
            <div key={idx} className="mb-3 p-3 bg-red-50 rounded">
              <p className="font-medium">{item.question}</p>
              <p className="text-green-600">
                정답: ({String.fromCharCode(65 + item.answer)}){" "}
                {item.choices[item.answer]}
              </p>
            </div>
          ))}
        </div>

        {/* 빈칸 오답 */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">빈칸 틀린 문제</h2>
          {wrongBlanks.length === 0 && <p>없음 🎉</p>}

          {wrongBlanks.map((item, idx) => (
            <div key={idx} className="mb-3 p-3 bg-yellow-50 rounded">
              <p>{item.question}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setPage("home")}
          className="w-full py-3 bg-blue-500 text-white rounded-xl"
        >
          홈으로
        </button>
      </div>
    );
  }

  if (!q) {
    return <div className="p-6">로딩중...</div>;
  }
  // ===== 퀴즈 =====
  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* 홈 버튼 */}
      <button
        onClick={() => setPage("home")}
        className="mb-4 text-blue-500"
      >
        ← 홈
      </button>

      <div className="bg-white p-6 rounded-3xl shadow">

        {/* 질문 */}
        <div className="mb-4 text-lg font-medium">
          {mode === "blank" ? (
            <>
              <RenderSentence
                parts={parts}
                inputs={inputs}
                setInputs={setInputs}
                showAnswer={showAnswer}
                onEnter={submitBlanks}
              />

              {step === "blank" && (
                <button
                  onClick={submitBlanks}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  빈칸 확인
                </button>
              )}
            </>
          ) : (
            <div>{q?.question}</div>
          )}
          <button
            onClick={() => {
              if (audio) {
                audio.currentTime = 0;
                audio.play();
              }
            }}
            className="mt-2 text-sm text-blue-500"
          >
            🔊 다시 듣기
          </button>
        </div>

        {/* 객관식 */}
        {(mode === "normal" || step === "choice") && (
          <div className="mt-4 space-y-2">
            {q?.choices?.map((c, idx) => {
              let style = "bg-gray-100";

              if (showResult) {
                if (idx === q.answer) {
                  style = "bg-green-300"; // 정답
                } else if (idx === selected) {
                  style = "bg-red-300"; // 틀린 선택
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => !showResult && selectChoice(idx)}
                  className={`w-full p-3 rounded transition ${style}`}
                >
                  ({String.fromCharCode(65 + idx)}) {c}
                </button>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}