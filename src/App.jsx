import { useEffect, useState } from "react";

// ===== 문제 데이터 =====
const allQuestions = [
{id:1,question:"Who has the key to the supply closet?",choices:["I'm free tonight.","I gave it to Jane.","It's actually quite far."],answer:1},
{id:2,question:"What did you think of our proposal?",choices:["Three hours.","I was impressed.","No, I didn't think I did."],answer:1},
{id:3,question:"Who's planning the client dinner?",choices:["It was canceled.","At a French restaurant.","A choice of entrees."],answer:0},
{id:4,question:"Which machine makes color copies?",choices:["These copies aren't very clear.","Yes, I like that color.","The one in Mr. Moro's office."],answer:2},
{id:5,question:"What is the shipping charge?",choices:["The battery is charging.","Around three days.","Four dollars per kilo."],answer:2},
{id:6,question:"Which pair of sunglasses did you decide to buy?",choices:["Actually, I didn't buy any.","Just a glass of water, please.","Thanks for the offer."],answer:0},
{id:7,question:"Who's going to lock up the store tonight?",choices:["I bought it at the store.","I'm working late, so I will.","For two nights only."],answer:1},
{id:8,question:"What should we discuss at the first meeting?",choices:["OK, I'll join you there.","The annual budget.","It seemed rather fast."],answer:1},
{id:9,question:"Who's introducing the guest lecturer this afternoon?",choices:["The director's going to.","Please order an extra microphone.","Nice to meet you, too."],answer:0},
{id:10,question:"What flavor of ice cream would you like?",choices:["Do you have a nondairy option?","Yes, we're open tomorrow.","A few more napkins, please."],answer:0},

{id:11,question:"When is the cargo plane landing?",choices:["In ten minutes.","Some auto parts.","At gate four."],answer:0},
{id:12,question:"Where did you buy this digital camera?",choices:["The old one broke down.","I paid in cash.","From our supplier."],answer:2},
{id:13,question:"When did you join the sales department?",choices:["Yes, I'm enjoying it here.","About three years ago.","In my new office."],answer:1},
{id:14,question:"Where should I sign this page?",choices:["Write your name.","Two copies, please.","In the lower left corner."],answer:2},
{id:15,question:"Where do these air conditioners go?",choices:["In the storage room.","It's in good condition.","Before noon."],answer:0},
{id:16,question:"When will this apartment be available to rent?",choices:["Eight hundred dollars per month.","On September first.","Includes laundry facilities."],answer:1},
{id:17,question:"Where was the writer's conference held last year?",choices:["In New York.","She finished it about a month ago.","You can register online."],answer:0},
{id:18,question:"When do you have time to meet with me?",choices:["No, I don't have one.","How about Tuesday afternoon?","It's ten o'clock."],answer:1},
{id:19,question:"Where's Dr. Mattison's office?",choices:["Because it's raining.","There's a directory in the lobby.","It starts at two o'clock."],answer:1},
{id:20,question:"When is the interview with the next candidate?",choices:["Yes, several qualifications.","We already made a job offer.","Some visitors' passes."],answer:1},

{id:21,question:"How much are the tickets?",choices:["Only fifty dollars!","About an hour.","I didn't take it."],answer:0},
{id:22,question:"Why did you bring a sweater?",choices:["In the closet.","Should I ask Mr. Liao?","It's usually cold in here."],answer:2},
{id:23,question:"How can we sign up for a tour of the castle?",choices:["Thank you very much.","I can help you with that.","No, we ordered three."],answer:1},
{id:24,question:"Why did the Citro Food Market move?",choices:["Yes, just a few days ago.","I'll order some healthy snacks.","Because it needed more space."],answer:2},
{id:25,question:"How often do you check your e-mail?",choices:["Yes, my work e-mail.","At least twice a day.","No, is it yours?"],answer:1},
{id:26,question:"Why is the office supply store closed?",choices:["I can do that.","Because it's being remodeled.","His office is in room 224."],answer:1},
{id:27,question:"Why is the factory increasing its hours of operation?",choices:["Ten-hour shifts.","Near the manufacturing plant.","To fill a special order."],answer:2},
{id:28,question:"How do these promotional posters look?",choices:["No, it wasn't at the post office.","I think they look great.","Go ahead, I don't mind."],answer:1},
{id:29,question:"Why has our supplier increased the delivery cost?",choices:["I'll give them a call.","Sure, next week.","How many would you like?"],answer:0},
{id:30,question:"How many customers came to our store’s sale yesterday?",choices:["Just three weeks.","In the clothing section.","I was on vacation."],answer:2},

{id:31,question:"Is David's retirement party on Friday?",choices:["Yes, are you coming?","We had a great time.","No, it's every Monday."],answer:0},
{id:32,question:"Did you deliver the letter personally?",choices:["No, I sent it by mail.","Several people were late.","No, I didn't read it."],answer:0},
{id:33,question:"Are there any extra tea cups?",choices:["In the cupboard over the sink.","Just a little, thanks.","I made it this morning."],answer:0},
{id:34,question:"Have you read our annual sales report?",choices:["Yes, it's quite promising.","It was only twenty euros.","I'll come to the next one."],answer:0},
{id:35,question:"Are you going to the laboratory this afternoon?",choices:["It's still experimental.","I'll be a bit late, but I'll be there.","Right this way, please."],answer:1},
{id:36,question:"Did you contact the landlord about the leaky tap?",choices:["Apartment 3G.","Two hundred dollars.","Yes, I called him yesterday."],answer:2},
{id:37,question:"Does your company have an office overseas?",choices:["That was a good offer.","My manager's ready to see you.","It actually has several of them."],answer:2},
{id:38,question:"Will Denise give a presentation at this year's conference?",choices:["The convention center is larger.","Thanks for the invitation.","Yes, she plans to."],answer:2},
{id:39,question:"Have they set up the equipment yet?",choices:["You can sit over there.","No, they'll do it tomorrow.","It's very expensive."],answer:1},
{id:40,question:"Was Chang-Ho at the workshop on Saturday?",choices:["It was very helpful.","Let me check the attendance list.","Open Monday to Friday."],answer:1},

{id:41,question:"Don't you like your new office?",choices:["Yes, it's a lot bigger.","I can turn it off.","No, it came yesterday."],answer:0},
{id:42,question:"The printer's still broken, isn't it?",choices:["It was fixed this morning.","He hasn't spoken yet.","I'll go later."],answer:0},
{id:43,question:"I didn't miss anything important, did I?",choices:["It was repaired yesterday.","She sent a part of it.","No, we just started."],answer:2},
{id:44,question:"Isn't park admission free for children under five?",choices:["Yes, you can park here.","No, but their tickets are half price.","It's at the south gate."],answer:1},
{id:45,question:"Internet access is available in the room, isn't it?",choices:["By e-mail will do.","A single room, please.","I'm afraid not."],answer:2},
{id:46,question:"Didn't you go to the movies last weekend?",choices:["I'll move it over there.","Good idea, I won't.","Yes, it was really entertaining."],answer:2},
{id:47,question:"The electrician is coming today, right?",choices:["He'll be here at eleven.","No, on the left side.","A maintenance schedule."],answer:0},
{id:48,question:"Weren't you planning to change the design for the new magazine cover?",choices:["No, not at this point.","The art director.","A hundred pages."],answer:0},
{id:49,question:"His instructions weren't very clear, were they?",choices:["I found them very confusing.","Mr. Ruiz is the construction manager.","Cloudy with a chance of rain."],answer:0},
{id:50,question:"Aren't you going to work out at the fitness center tonight?",choices:["Did it fit in your locker?","I won't have time today.","You should be able to walk there."],answer:1},

{id:51,question:"Why don't you take Broad Street?",choices:["About five miles.","I'll take it with me.","It's closed for repairs."],answer:2},
{id:52,question:"Would you like to meet in the cafeteria or my office?",choices:["I agree with you.","Let's meet in the cafeteria.","I turned it off."],answer:1},
{id:53,question:"Can I pay by credit card?",choices:["He can go by car.","More than two days.","You certainly can."],answer:2},
{id:54,question:"Do you want the hardcover or paperback version of the book?",choices:["Yes, it's covered.","Either is fine.","On page fifty-seven."],answer:1},
{id:55,question:"Could you help Mr. Peters with the copy machine?",choices:["I think it is.","Yes, she has it.","I'll be happy to."],answer:2},
{id:56,question:"Would you rather live here or in the city center?",choices:["I'd prefer to stay here.","It's no bother.","Yes, for seven years."],answer:0},
{id:57,question:"Would you like this shoe in a different size?",choices:["No, this size fits well.","Behind the mirror.","Here's your receipt."],answer:0},
{id:58,question:"Are we meeting in the conference room on the first or second floor?",choices:["Yes, close the door.","Let me check.","There's lots of room."],answer:1},
{id:59,question:"Can you take this call, or are you in the middle of something?",choices:["A mobile phone.","I'll be there in a minute.","In the directory."],answer:1},
{id:60,question:"Would you mind opening the door?",choices:["To my mind, he's right.","Of course, here you go.","It's on my desk."],answer:1},

{id:61,question:"Eric wants to see you before you leave.",choices:["I'll meet with him at four.","Yes, I have a key.","How many should I leave?"],answer:0},
{id:62,question:"Can you tell me where the nearest bus stop is?",choices:["It's just around the corner.","Every 20 minutes.","No, I'm sorry, you can't."],answer:0},
{id:63,question:"I'd like your feedback on our new advertisement.",choices:["Go through the back door.","I can review it tomorrow.","Let's order some."],answer:1},
{id:64,question:"Do you know when the journal article is due?",choices:["No more than three thousand words.","He found it in a magazine.","Early next week."],answer:2},
{id:65,question:"We ought to cancel the outdoor picnic.",choices:["Do you think that's necessary?","That's a great color.","Yes, let's pick one."],answer:0},
{id:66,question:"The shipment won't be delivered until Friday.",choices:["Usually to the warehouse.","That's later than we'd expected.","Just our regular order."],answer:1},
{id:67,question:"May I ask why you're canceling your subscription?",choices:["Yes, next week will be fine.","We're moving out of the country.","It's a very effective medicine."],answer:1},
{id:68,question:"I'd like to reserve a room for a video conference this afternoon.",choices:["We see each other often.","Sorry, none are available.","Try turning up the volume."],answer:1},
{id:69,question:"We're offering a special discount on this model.",choices:["When does the offer expire?","A routine inspection.","The end of the season."],answer:0},
{id:70,question:"Do you know who's going to be hired as the new assistant?",choices:["It hasn't been decided yet.","No higher than last week.","That's good news."],answer:0}
];



// ===== 유틸 =====
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
function pickCount(arr, count) {
  return shuffle(arr).slice(0, count);
}

// ===== 진동 =====
function vibrate(type = "success") {
  if (!navigator.vibrate) return;
  if (type === "success") navigator.vibrate(40);
  else navigator.vibrate([80, 40, 80]);
}

// ===== 효과음 =====
function playSound(type) {
  const audio = new Audio(`/audio/${type}.mp3`);
  audio.play().catch(() => {});
}

// ===== 빈칸 생성 =====
function makeBlanks(sentence) {
  const stopWords = new Set([
    "the","a","an","to","of","in","on","at","for","and",
    "is","are","was","were","be","been","being",
    "do","does","did",
    "i","you","he","she","it","we","they"
  ]);

  return sentence.split(" ").map(w => {
    const match = w.match(/^(.+?)([.,!?])?$/);
    const word = match[1];
    const punct = match[2] || "";

    if (word.length <= 2 || stopWords.has(word.toLowerCase())) {
      return { type: "text", value: word + punct };
    }

    if (Math.random() < 0.35) {
      return { type: "blank", answer: word, punct };
    }

    return { type: "text", value: word + punct };
  });
}

// ===== 문장 렌더 =====
function RenderSentence({ parts, inputs, setInputs, showAnswer }) {
  let idx = 0;

  return (
    <div className="flex flex-wrap gap-1 text-lg leading-7">
      {parts.map((p, i) => {
        if (p.type === "text") {
          return <span key={i}>{p.value}&nbsp;</span>;
        }

        const current = idx++;
        const wrong = showAnswer && inputs[current] !== p.answer;

        return (
          <span key={i} className="flex items-center">
            <input
              value={showAnswer ? p.answer : inputs[current] || ""}
              onChange={(e) => {
                const copy = [...inputs];
                copy[current] = e.target.value;
                setInputs(copy);
              }}
              className={`w-16 text-center border-b-2 outline-none
              ${wrong ? "border-red-500 text-red-500" : "border-gray-400"}
              focus:border-blue-500`}
            />
            <span>{p.punct}&nbsp;</span>
          </span>
        );
      })}
    </div>
  );
}

// ===== 앱 =====
export default function App() {
  const [page, setPage] = useState("home");

  const [mode, setMode] = useState("normal");
  const [count, setCount] = useState(10);

  const [list, setList] = useState([]);
  const [i, setI] = useState(0);
  const [q, setQ] = useState(null);

  const [parts, setParts] = useState([]);
  const [inputs, setInputs] = useState([]);

  const [audio, setAudio] = useState(null);

  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState(null);
  const [anim, setAnim] = useState("");

  // ===== 시작 =====
  function start() {
    setList(pickCount(allQuestions, count));
    setI(0);
    setPage("quiz");
  }

  // ===== 문제 로드 =====
  useEffect(() => {
    if (!list.length) return;

    const cur = list[i];
    setQ(cur);

    // 🔥 기존 음성 정지
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    // 🔥 문제 음성
    const newAudio = new Audio(`/audio/${cur.id}.mp3`);
    newAudio.play().catch(() => {});
    setAudio(newAudio);

    if (mode === "blank") {
      const p = makeBlanks(cur.question);
      setParts(p);
      setInputs(Array(p.filter(x => x.type === "blank").length).fill(""));
    }

    setShowAnswer(false);
    setSelected(null);
  }, [list, i]);

  // ===== 빈칸 제출 =====
  function submitBlank() {
    let correct = true;
    let idx = 0;

    for (let p of parts) {
      if (p.type === "blank") {
        if (inputs[idx] !== p.answer) correct = false;
        idx++;
      }
    }

    setShowAnswer(true);

    if (correct) {
      vibrate("success");
      playSound("correct");
    } else {
      vibrate("fail");
      playSound("wrong");
    }
  }

  // ===== 선택 =====
  function choose(idx) {
    setSelected(idx);

    if (idx === q.answer) {
      vibrate("success");
      playSound("correct");
      setAnim("scale-105 bg-green-100");
    } else {
      vibrate("fail");
      playSound("wrong");
      setAnim("shake bg-red-100");
    }

    setTimeout(() => {
      setAnim("");
      if (i + 1 >= list.length) setPage("home");
      else setI(i + 1);
    }, 900);
  }

  // ===== 홈 =====
  if (page === "home") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-3xl shadow-xl w-80">

          <h1 className="text-xl font-bold mb-4 text-center">Quiz</h1>

          {/* 모드 */}
          <div className="mb-4">
            <button
              onClick={() => setMode("normal")}
              className={`w-full mb-2 p-3 rounded-xl ${
                mode === "normal" ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              빠른 풀이
            </button>

            <button
              onClick={() => setMode("blank")}
              className={`w-full p-3 rounded-xl ${
                mode === "blank" ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              빈칸 + 풀이
            </button>
          </div>

          {/* 문제 수 */}
          <div className="mb-4">
            <div className="grid grid-cols-4 gap-2">
              {[10,30,50,70].map(n => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`py-2 rounded-xl ${
                    count === n ? "bg-black text-white" : "bg-gray-200"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={start}
            className="w-full p-3 bg-black text-white rounded-xl active:scale-95"
          >
            시작
          </button>
        </div>
      </div>
    );
  }

  if (!q) return null;

  // ===== 퀴즈 =====
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className={`bg-white rounded-3xl shadow-xl p-5 w-full max-w-md ${anim}`}>

        {/* 질문 */}
        <div className="mb-4">
          {mode === "blank" ? (
            <RenderSentence
              parts={parts}
              inputs={inputs}
              setInputs={setInputs}
              showAnswer={showAnswer}
            />
          ) : (
            <div className="text-lg font-medium">{q.question}</div>
          )}
        </div>

        {/* 빈칸 버튼 */}
        {mode === "blank" && (
          <button
            onClick={submitBlank}
            className="w-full mb-3 py-2 bg-gray-200 rounded-xl active:scale-95"
          >
            확인
          </button>
        )}

        {/* 선택지 */}
        <div className="space-y-2">
          {q.choices.map((c, idx) => {
            let style = "bg-gray-100";

            if (selected !== null) {
              if (idx === q.answer) style = "bg-green-300";
              else if (idx === selected) style = "bg-red-300";
            }

            return (
              <button
                key={idx}
                onClick={() => selected === null && choose(idx)}
                className={`w-full p-3 rounded-xl transition active:scale-95 ${style}`}
              >
                ({String.fromCharCode(65 + idx)}) {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* 애니메이션 */}
      <style>{`
        .shake {
          animation: shake 0.4s;
        }
        @keyframes shake {
          25% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
          75% { transform: translateX(-6px); }
        }
      `}</style>
    </div>
  );
}