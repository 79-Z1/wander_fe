import React, {FC, useEffect, useState} from 'react';
import AIApi from '@/common/api/ai.api';
import {ILocation} from '@/common/entities';

import {cn} from '@/components/utils';

import AISuggestionLoading from '@/common/components/ai-suggestion-loading';

import {IComponentBaseProps} from '@/common/interfaces';

export type TAISuggestionProps = IComponentBaseProps & {
  location: ILocation;
};

const AISuggestion: FC<TAISuggestionProps> = ({className, location}) => {
  const [aiSuggestion, setAISuggestion] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAISuggestion() {
      setLoading(true);
      // Check cache
      const cacheKey = `ai-suggestion-${location.lat}-${location.lng}`;
      const cachedSuggestion = sessionStorage.getItem(cacheKey);

      if (cachedSuggestion) {
        setAISuggestion(cachedSuggestion);
        setLoading(false);
      } else {
        const res = await AIApi.getAISuggestion(location);
        if (res) {
          setAISuggestion(res.metadata);
          sessionStorage.setItem(cacheKey, res.metadata); // Save to cache
        }
        setLoading(false);
      }
    }

    getAISuggestion();
  }, []);

  return (
    <div className={cn('AISuggestion', className)} data-testid="AISuggestion">
      {loading ? <AISuggestionLoading /> : <p className="whitespace-pre-line">{aiSuggestion}</p>}
    </div>
  );
};

AISuggestion.displayName = 'AISuggestion';

export default AISuggestion;
