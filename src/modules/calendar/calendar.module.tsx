'use client';
import {FC} from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import {IComponentBaseProps} from '@/common/interfaces';

export type TCalendarModuleProps = IComponentBaseProps & {
  calendars?: any;
};

const CalendarModule: FC<TCalendarModuleProps> = ({className, calendars}) => {
  console.log('🚀 ~ calendars:::', calendars);
  const formatDayHeader = (info: any) => {
    if (info.view.type === 'timeGridWeek') {
      return info.date.getDate().toString();
    } else {
      const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
      return days[info.date.getDay()];
    }
  };

  const renderEventContent = (eventInfo: any) => {
    if (eventInfo.view.type === 'dayGridMonth') {
      return <i>{eventInfo.event.title}</i>;
    } else {
      return (
        <>
          <b>{eventInfo.timeText}</b>
          <i>{eventInfo.event.title}</i>
        </>
      );
    }
  };

  const handleDateClick = (arg: any) => {
    alert(arg.dateStr);
  };

  return (
    <div className={className}>
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
        eventClick={e => console.log('🚀 ~ e:::', e)}
        events={calendars || []}
        eventContent={renderEventContent}
        // editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        allDaySlot={false}
      />
    </div>
  );
};

export default CalendarModule;
