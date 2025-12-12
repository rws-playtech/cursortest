import { useMemo, useState } from 'react';
import { Game } from '../types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, startOfDay } from 'date-fns';
import styles from './CalendarView.module.css';

type DateType = 'release' | 'available';

interface CalendarViewProps {
  games: Game[];
  onGameClick: (game: Game) => void;
}

export default function CalendarView({ games, onGameClick }: CalendarViewProps) {
  const [dateType, setDateType] = useState<DateType>('release');

  const months = useMemo(() => {
    const today = new Date();
    const monthsToShow = 6;
    const result = [];

    for (let i = 0; i < monthsToShow; i++) {
      const currentMonth = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const start = startOfMonth(currentMonth);
      const end = endOfMonth(currentMonth);
      const days = eachDayOfInterval({ start, end });

      // Get games for this month based on selected date type
      const monthGames = games.filter(game => {
        const gameDate = new Date(dateType === 'release' ? game.releaseDate : game.availableDate);
        return gameDate.getMonth() === currentMonth.getMonth() &&
               gameDate.getFullYear() === currentMonth.getFullYear();
      });

      result.push({
        date: currentMonth,
        days,
        games: monthGames,
      });
    }

    return result;
  }, [games, dateType]);

  const getGamesForDay = (day: Date, monthGames: Game[]) => {
    return monthGames.filter(game => {
      const gameDate = new Date(dateType === 'release' ? game.releaseDate : game.availableDate);
      return isSameDay(gameDate, day);
    });
  };

  return (
    <div className={styles.calendarContainer}>
      {/* Date Type Toggle */}
      <div className={styles.dateTypeToggle}>
        <span className={styles.dateTypeLabel}>Show dates by:</span>
        <div className={styles.toggleButtons}>
          <button
            className={`${styles.toggleButton} ${dateType === 'release' ? styles.toggleButtonActive : ''}`}
            onClick={() => setDateType('release')}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Release Date
            <span className={styles.dateTypeHint}>When game is released</span>
          </button>
          <button
            className={`${styles.toggleButton} ${dateType === 'available' ? styles.toggleButtonActive : ''}`}
            onClick={() => setDateType('available')}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Available on My Brand
            <span className={styles.dateTypeHint}>When I can activate it</span>
          </button>
        </div>
      </div>

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
