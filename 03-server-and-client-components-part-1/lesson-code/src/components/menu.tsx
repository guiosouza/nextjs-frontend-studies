import Link from "next/link";

export default function Menu() {
  
  return (
    <ul className="menu">
      <li>
        <Link href="/" prefetch={true}>
          Home{" "}
        </Link>
      </li>
      <li>
        <Link href="/about#empresa" prefetch={true}>
          About{" "}
        </Link>
      </li>
    </ul>
  );
}
