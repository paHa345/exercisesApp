import Link from "next/link";

function PageNotFound() {
  //werwerwer
  return (
    <div>
      <div className=" text-center text-4xl font-bold my-32">
        <h1 className=" text-center text-4xl font-bold my-3">404</h1>
        <h1 className=" text-center text-xl font-bold my-3">Страница не найдена!!!</h1>
        <Link
          className=" text-center px-auto mx-auto hover:underline text-xl font-bold my-3"
          href="/"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
