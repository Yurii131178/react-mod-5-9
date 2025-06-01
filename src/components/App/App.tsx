/**
 * Хук useQuery

const myQuery = useQuery({
  queryKey: ['myQueryKey'], // ключ запиту
  queryFn: myQueryFunction   // функція запиту
});

queryKey – унікальний ключ запиту,
queryFn – асинхронна функція, що виконує запит до API або іншого джерела даних. Ця функція повинна повертати проміс із даними. Вона автоматично викликається для запиту.

Хук useQuery повертає об’єкт з корисною інформацією про запит:

const { data, error, isLoading, isError, isSuccess } = useQuery({
  queryKey: ['myQueryKey'], 
  queryFn: myQueryFunction  
});
data – дані, які були успішно отримані в результаті запиту.
error – якщо запит завершився помилкою, ця властивість містить інформацію про помилку.
isLoading – якщо запит ще виконується, значення буде true.
isError – якщо запит не вдалося виконати (наприклад, через мережеві помилки), значення буде true.
isSuccess – якщо запит успішно виконався і дані отримано, значення буде true.


Хук useQuery призначений тільки для виконання GET-запитів, тобто отримання даних з API, 
 */
//...........................................................................
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const fetchPerson = async () => {
//   const response = await axios.get(`https://swapi.info/api/people/13`);
//   return response.data;
// };

// export default function App() {
//   const { data, error, isLoading, isError } = useQuery({
//     queryKey: ['person'],
//     queryFn: fetchPerson,
//   });

//   return (
//     <>
//       {isLoading && <p>Loading...</p>}
//       {isError && <p>An error occurred: {error.message}</p>}
//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//     </>
//   );
// }
//.............................................................................
/**
 * ------------------------Ключі запиту-----------------------------------------//
В основі React Query лежить управління кешуванням запитів, яке здійснюється на основі ключів запитів. Якщо ключ запиту змінюється, React Query розуміє, що це новий запит, і виконує його знову. Це дуже корисно, коли ви хочете, щоб запит повторювався, наприклад, при зміні значення в інтерфейсі.

Зміна ключа запиту зазвичай використовується, коли потрібно виконати новий запит після зміни стану або пропсів у компоненті.

Розглянемо приклад, коли ви хочете отримати нові дані при зміні значення лічильника. Наприклад, при кожному кліку на кнопку лічильник збільшується, і ви робите запит на сервер для отримання нового персонажа з API (Star Wars API).
 */
//......................................................................
// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const fetchPerson = async (id: number) => {
//   const response = await axios.get(`https://swapi.info/api/people/${id}`);
//   return response.data;
// };

// export default function App() {
//   const [count, setCount] = useState(1);

//   const { data, error, isLoading, isError } = useQuery({
//     queryKey: ['person', count], // змінюємо ключ запиту залежно від count
//     queryFn: () => fetchPerson(count),
//   });

//   return (
//     <>
//       <button onClick={() => setCount(count + 1)}>
//         Get next character with ID: {count}
//       </button>
//       {isLoading && <p>Loading...</p>}
//       {isError && <p>Error: {error?.message}</p>}
//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//     </>
//   );
// }
//.......................................................................................
/**
 * queryKey: ['person', count] – унікальний ключ для запиту, який містить масив. Важливо, що ми додаємо змінну count до цього ключа. Коли count змінюється, React Query буде вважати це новим запитом і автоматично виконає його знову.
queryFn: () => fetchPerson(count) – функція запиту, яка приймає count як параметр. Це дозволяє кожного разу запитувати нові дані для персонажа залежно від значення лічильника.

🧠 Кожного разу, коли змінюється count, зміна ключа запиту гарантує, що запит буде повторно виконаний з новими даними. Цей запит виконується при монтуванні компонента і після кожного оновлення стану count.
 */
//==================================================================//
/**
 * -------------------Залежні запити------------------------------//
 * 
Залежні запити (Dependent Queries) – це запити, які залежать від результату інших запитів або стану компонента. В React Query ви можете використовувати властивість enabled для відкладеного виконання useQuery.

Якщо хук useQuery не містить властивості enabled, запит виконується автоматично при монтуванні компонента. Ви можете використовувати enabled, щоб умовно активувати запит залежно від певних значень або подій. Наприклад, запит на отримання даних не буде виконуватись до того, як користувач введе дані в форму чи вибере параметри в інтерфейсі.

const myQuery = useQuery({
	queryKey: ['myKey'],
	queryFn: myQueryFn,
	enabled: false
});

enabled: true – запит виконується одразу або після зміни залежностей.
enabled: false – запит не виконується, навіть якщо компоненти монтуються чи залежності змінюються.

Уявіть, що у вас є форма, де користувач вводить ключ для пошуку. Запит на сервер має виконуватись тільки після того, як користувач натисне кнопку для підтвердження введених даних. Для цього ми можемо використати enabled.
 */
//...................................................................
// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const fetchCharacter = async (id: string) => {
//   const response = await axios.get(`https://swapi.info/api/people/${id}`);
//   return response.data;
// };

// export default function App() {
//   const [characterId, setCharacterId] = useState('');

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['character', characterId],
//     queryFn: () => fetchCharacter(characterId),
//     enabled: characterId !== '',
//   });

//   const handleSearch = (formData: FormData) => {
//     const id = formData.get('id') as string;
//     setCharacterId(id);
//   };

//   return (
//     <>
//       <form action={handleSearch}>
//         <input type="text" name="id" placeholder="Enter character ID" />
//         <button type="submit">Search</button>
//       </form>
//       {isLoading && <p>Loading data, please wait...</p>}
//       {isError && <p>Whoops, something went wrong! {error?.message}</p>}
//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//     </>
//   );
// }
//..................................................................
/**
 * Завдяки enabled: characterId !== "" – запит буде виконуватись тільки тоді, коли в поле пошуку введено значення. Якщо characterId порожнє, запит не буде виконуватись.

🧠 Властивість enabled корисна для відкладених GET-запитів, коли запит має виконуватись лише після того, як зміниться стан або користувач виконає певну дію (наприклад, введе дані в форму або вибере опцію).
 */
//==========================================================================//
// import { useState } from 'react';
// import { useQuery, keepPreviousData } from '@tanstack/react-query';
// import SearchForm from '../SearchForm/SearchForm';
// import ArticleList from '../ArticleList/ArticleList';
// import { fetchArticles } from '../sevices/ArticleServis';
// export default function App() {
//   const [topic, setTopic] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['articles', topic, currentPage],
//     queryFn: () => fetchArticles(topic, currentPage),
//     enabled: topic !== '',
//     placeholderData: keepPreviousData,
//   });

//   const totalPages = data?.nbPages ?? 0;

//   const handleSearch = async (newTopic: string) => {
//     setTopic(newTopic);
//     setCurrentPage(1);
//   };

//   return (
//     <>
//       <SearchForm onSubmit={handleSearch} />
//       <p>
//         Current page {currentPage} | Total pages {totalPages}
//       </p>
//       <button
//         onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
//         disabled={currentPage === 1}
//       >
//         Previous
//       </button>
//       <button
//         onClick={() => setCurrentPage(currentPage + 1)}
//         disabled={currentPage >= totalPages}
//       >
//         Next
//       </button>
//       {isLoading && <p>Loading data, please wait...</p>}
//       {isError && <p>Whoops, something went wrong! Please try again!</p>}
//       {data && data.hits.length > 0 && <ArticleList items={data.hits} />}
//     </>
//   );
// }
//..............................................................................
//  ----------------------------Пагінація запитів------------------------------
// Пагінація – це техніка розбиття великого об'єму даних на малі частини (сторінки) для зменшення навантаження на сервер. З React Query пагінація стає значно простішою, оскільки бібліотека автоматично обробляє кешування та повторні запити.

// Ось приклад реалізації пагінації для пошуку статей. Задача – зберігати номер поточної сторінки та змінювати його, наприклад, при натисканні кнопки. Далі ми пройдемось основними моментами та детально розберемо всі нюанси на лекціях.

// import { useState } from 'react';
// import { useQuery, keepPreviousData } from '@tanstack/react-query';
// import SearchForm from '../SearchForm/SearchForm';
// import ArticleList from '../ArticleList/ArticleList';
// import { fetchArticles } from '../sevices/ArticleServis';

// export default function App() {
//   const [topic, setTopic] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['articles', topic, currentPage],
//     queryFn: () => fetchArticles(topic, currentPage),
//     enabled: topic !== '',
//     placeholderData: keepPreviousData,
//   });

//   const totalPages = data?.nbPages ?? 0;

//   const handleSearch = async (newTopic: string) => {
//     setTopic(newTopic);
//     setCurrentPage(1);
//   };

//   return (
//     <>
//       <SearchForm onSubmit={handleSearch} />
//       <p>
//         Current page {currentPage} | Total pages {totalPages}
//       </p>
//       <button
//         onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
//         disabled={currentPage === 1}
//       >
//         Previous
//       </button>
//       <button
//         onClick={() => setCurrentPage(currentPage + 1)}
//         disabled={currentPage >= totalPages}
//       >
//         Next
//       </button>
//       {isLoading && <p>Loading data, please wait...</p>}
//       {isError && <p>Whoops, something went wrong! Please try again!</p>}
//       {data && data.hits.length > 0 && <ArticleList items={data.hits} />}
//     </>
//   );
// }
// 💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡
/**Основні моменти

💡Спочатку створюємо стан для зберігання номера сторінки:

const [currentPage, setCurrentPage] = useState(1);

💡Для кожної сторінки потрібно використовувати унікальний ключ (queryKey), щоб React Query правильно кешував та оновлював дані:

const queryData = useQuery({
  queryKey: ["articles", topic, currentPage],
  });

💡Використання різних ключів для кожної сторінки дозволяє правильно кешувати дані і уникнути дублювання запитів.


💡Функція запиту має приймати номер сторінки і використовувати його для отримання відповідних даних:

const queryData = useQuery({
  queryKey: ["articles", topic, currentPage],
  queryFn: () => fetchArticles(topic, currentPage),
});

💡Використовуємо властивість enabled, щоб запит виконувався тільки після того, як користувач введе значення для пошуку:

const queryData = useQuery({
	queryKey: ["articles", topic, currentPage],
	queryFn: () => fetchArticles(topic, currentPage),
	enabled: topic !== "",
});

💡Щоб між запитами не було "блимань" екрану, додаємо властивість placeholderData, яка дозволяє на час завантаження нових даних показувати попередні або тимчасові дані. Також використовуємо keepPreviousData (імпорт з React Query) для збереження попереднього запиту, поки не прийдуть нові дані:

const queryData = useQuery({
  queryKey: ["articles", topic, currentPage],
  queryFn: () => fetchArticles(topic, currentPage),
  enabled: topic !== "",
  placeholderData: keepPreviousData,
}); */

// 💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡
// *
//   ---------------------------Бібліотека React Paginate---------------------------------------------

// Для створення зручного користувачу інтерфейсу пагінації використаємо бібліотеку React Pagiante яка надає готовий компонент із необхідною логікою.
// 💡Додаємо бібліотеку:

// npm i react-paginate

// 💡Імпортуємо компонент:

// import ReactPaginate from 'react-paginate';

// 💡Подивіться приклад у редакторі – він демонструє, як усе працює разом
//.......................................................................

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import SearchForm from '../SearchForm/SearchForm';
import ArticleList from '../ArticleList/ArticleList';
import { fetchArticles } from '../sevices/ArticleServis';
import css from './App.module.css';

export default function App() {
  const [topic, setTopic] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['articles', topic, currentPage],
    queryFn: () => fetchArticles(topic, currentPage),
    enabled: topic !== '',
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.nbPages ?? 0;

  const handleSearch = async (newTopic: string) => {
    setTopic(newTopic);
    setCurrentPage(1);
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {data && data.hits.length > 0 && <ArticleList items={data.hits} />}
    </>
  );
}

//...........................................................
// Ось пояснення пропсів для компонента ReactPaginate:

// <ReactPaginate
// 	pageCount={totalPages}
// 	pageRangeDisplayed={5}
// 	marginPagesDisplayed={1}
// 	onPageChange={({ selected }) => setCurrentPage(selected + 1)}
// 	forcePage={currentPage - 1}
// 	containerClassName={css.pagination}
// 	activeClassName={css.active}
// 	nextLabel="→"
// 	previousLabel="←"
// />

// 1. pageCount:

// Вказує загальну кількість сторінок. Це потрібно для того, щоб компонент знав, скільки сторінок потрібно відобразити.
// В нашому випадку це має бути кількість сторінок, яку ви отримуєте від сервера або підраховуєте на основі загальної кількості елементів та кількості елементів на сторінці.

// 2. pageRangeDisplayed:

// Визначає, скільки сторінок відображатиметься у навігаційній панелі пагінації. Наприклад, якщо встановити pageRangeDisplayed={5}, компонент відобразить 5 сторінок навігації одночасно.

// 3. marginPagesDisplayed:

// Вказує кількість сторінок, які будуть відображатися на початку і в кінці пагінації. Наприклад, якщо ви встановите marginPagesDisplayed={1}, це означає, що будуть показані перша і остання сторінки, незалежно від того, яка поточна сторінка.

// 4. onPageChange:

// Це колбек, який викликається при зміні сторінки. Він отримує об'єкт, в якому є значення selected – індекс вибраної сторінки (починаючи з 0). Ви використовуєте це значення для оновлення стану, наприклад, щоб змінити поточну сторінку.
// В цьому прикладі onPageChange={({ selected }) => setCurrentPage(selected + 1)} означає, що кожного разу, коли сторінка змінюється, викликається функція, яка оновлює currentPage (пам'ятаємо, що selected починається з 0, а сторінки у додатку можуть починатися з 1).

// 5. forcePage:

// Цей пропс дозволяє вручну контролювати поточну сторінку. Якщо ви хочете, щоб пагінація відображала певну сторінку незалежно від того, скільки разів користувач клікав на кнопки переходу, можна передати цей пропс.

// 6. containerClassName:

// Визначає клас для контейнера пагінації. Це дозволяє стилізувати пагінацію за допомогою CSS. У даному прикладі це css.pagination, що буде застосовувати стилі, визначені в файлі CSS.

// 7. activeClassName:

// Визначає клас для активної сторінки. Тобто, коли користувач знаходиться на певній сторінці, цей клас буде застосований до її кнопки. Це дозволяє стилізувати активну сторінку. Наприклад, css.active може бути стилем для виділення поточної сторінки.

// 8. nextLabel:

// Визначає текст або символ, який буде відображатися на кнопці "Наступна сторінка". У цьому випадку "→".

// 9. previousLabel:

// Визначає текст або символ для кнопки "Попередня сторінка". У цьому випадку "←".
