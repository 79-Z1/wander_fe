'use client';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

export default function CalendarModule() {
  const formatDayHeader = (info: any) => {
    if (info.view.type === 'timeGridWeek') {
      return info.date.getDate().toString();
    } else {
      const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
      return days[info.date.getDay()];
    }
  };
  const handleDateClick = (arg: any) => {
    alert(arg.dateStr);
  };

  return (
    <div className="App">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        dayHeaderContent={formatDayHeader}
        firstDay={1}
        locale={'vi'}
        buttonText={{
          today: 'Hôm nay',
          month: 'Tháng',
          week: 'Tuần',
          day: 'Ngày',
          list: 'Danh sách'
        }}
        weekends={true}
        dateClick={e => handleDateClick(e)}
        events={[
          {title: 'event 1', start: '2024-04-21T12:00:00', end: '2024-04-25'},
          {title: 'event 2', date: '2024-05-17'}
        ]}
        eventContent={renderEventContent}
        // editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        allDaySlot={false}
      />
    </div>
  );
}

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
