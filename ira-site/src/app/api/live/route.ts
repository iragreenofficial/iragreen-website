import { NextResponse } from "next/server";

const CALENDAR_URL =
  "https://calendar.google.com/calendar/ical/9454cec08a6e91f7e0ef5951442bfa2b26c0c4b916736eb5357719fce8a36fd2%40group.calendar.google.com/public/basic.ics";

export async function GET() {
  try {
    const response = await fetch(CALENDAR_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    const text = await response.text();

    const events = text
      .split("BEGIN:VEVENT")
      .slice(1)
      .map((block) => {
        const title = block.match(/SUMMARY:(.*)/)?.[1]?.trim() || "";
        const location = block.match(/LOCATION:(.*)/)?.[1]?.trim() || "";
        const description = block.match(/DESCRIPTION:(.*)/)?.[1]?.trim() || "";
        const rawDate =
          block.match(/DTSTART(?:;[^:]*)?:(.*)/)?.[1]?.trim() || "";

const clean = (value: string) =>
  value
    .replace(/\\,/g, ",")
    .replace(/\\\\/g, " ")
    .replace(/\\n/g, " ")
    .trim();

return {
  title: clean(title),
  location: clean(location),
  description: clean(description),
  date: rawDate,
};
      })
      .filter((event) => event.title)
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to load calendar events" },
      { status: 500 }
    );
  }
}