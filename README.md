# WorkPulse
application that reminds you to take breaks. Create new work sessions and continue work sessions. Start work session and get break reminders. This application uses supabase to store data.

## How does this work?
* Sign up to create your own account (or use demo users)
  * if you signed by yourself, go authenticate your email by pressing the link supabase sent you
* Log in with the user
* Create your first work session by pressing the + button on the bottom right corner
  * Name the session
  * Set the length of the session
  * Set your desired break interval
  * Click next
  * Set names for every break you have and the length for each break
* Now you can start your session, which leads you to a page with timers
  * See how much work time you have left
  * See when your break starts and when it ends
  * **REMEBER to allow notifications to get break reminders** and to get notification when the break ends
  * You can also end session mid work session if you want to
* Every time you press return to home page when the session ends or the end session button, data how much you worked will be sent to supabase and the application will tell you in the home page how much you have worked in       that session
* You can also edit and delete sessions

## Technologies used
* Next.js
* React
* Supabase for realtime-database and authentication
* Typescirpt
* Netlify for deployment

## Demo Users

| Email    | Password |
| -------- | ------- |
| repav18580@0tires.com  | test123    |
| mijosaf348@endibit.com | testi123   |
