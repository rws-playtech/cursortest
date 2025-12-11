import { useMemo } from 'react';
import { Game } from '../types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, startOfDay } from 'date-fns';
import styles from './CalendarView.module.css';

interface CalendarViewProps {
  games: Game[];
  onGameClick: (game: Game) => void;
}

export default function CalendarView({ games, onGameClick }: CalendarViewProps) {
  const months = useMemo(() => {
    const today = new Date();
    const monthsToShow = 6;
    const result = [];

    for (let i = 0; i < monthsToShow; i++) {
      const currentMonth = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const start = startOfMonth(currentMonth);
      const end = endOfMonth(currentMonth);
      const days = eachDayOfInterval({ start, end });

      // Get games for this month
      const monthGames = games.filter(game => {
        const releaseDate = new Date(game.releaseDate);
        return releaseDate.getMonth() === currentMonth.getMonth() &&
               releaseDate.getFullYear() === currentMonth.getFullYear();
      });

      result.push({
        date: currentMonth,
        days,
        games: monthGames,
      });
    }

    return result;
  }, [games]);

  const getGamesForDay = (day: Date, monthGames: Game[]) => {
    return monthGames.filter(game => 
      isSameDay(new Date(game.releaseDate), day)
    );
  };

  return (
    <div className={styles.calendarContainer}>
      {months.map((month, monthIndex) => (
        <div key={monthIndex} className={styles.monthContainer}>
          <div className={styles.monthHeader}>
            <h3 className={styles.monthTitle}>
              {format(month.date, 'MMMM yyyy')}
            </h3>
            <span className={styles.monthGamesCount}>
              {month.games.length} game{month.games.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className={styles.calendar}>
            <div className={styles.weekdays}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className={styles.weekday}>
                  {day}
                </div>
              ))}
            </div>

            <div className={styles.days}>
              {/* Empty cells for days before month starts */}
              {Array.from({ length: month.days[0].getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className={styles.dayEmpty}></div>
              ))}

              {/* Actual days */}
              {month.days.map((day, dayIndex) => {
                const dayGames = getGamesForDay(day, month.games);
                const isPast = isBefore(day, startOfDay(new Date()));
                const todayClass = isToday(day) ? styles.dayToday : '';

                return (
                  <div
                    key={dayIndex}
                    className={`${styles.day} ${todayClass} ${isPast ? styles.dayPast : ''}`}
                  >
                    <div className={styles.dayNumber}>
                      {format(day, 'd')}
                    </div>
                    {dayGames.length > 0 && (
                      <div className={styles.dayGames}>
                        {dayGames.map(game => (
                          <div
                            key={game.id}
                            className={styles.gameEvent}
                            onClick={() => onGameClick(game)}
                            title={game.name}
                          >
                            <div className={styles.gameEventDot}></div>
                            <div className={styles.gameEventName}>
                              {game.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Month Games List */}
          {month.games.length > 0 && (
            <div className={styles.monthGamesList}>
              <h4 className={styles.gamesListTitle}>Releases this month:</h4>
              <div className={styles.gamesList}>
                {month.games.map(game => (
                  <div
                    key={game.id}
                    className={styles.gamesListItem}
                    onClick={() => onGameClick(game)}
                  >
                    <div className={styles.gamesListImage}>
                      <img src={game.imageUrl} alt={game.name} />
                    </div>
                    <div className={styles.gamesListInfo}>
                      <div className={styles.gamesListName}>{game.name}</div>
                      <div className={styles.gamesListDate}>
                        {format(new Date(game.releaseDate), 'MMM dd, yyyy')}
                      </div>
                    </div>
                    <div className={styles.gamesListCategory}>
                      {game.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
