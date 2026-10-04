import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getDailyBrainIdea, getDayOfYearIndex } from './brainIdeas';

describe('daily brain idea rotation', () => {
  it('returns a stable day index for the same date', () => {
    const date = new Date('2026-01-15T12:00:00Z');
    const idea = getDailyBrainIdea(date);

    assert.equal(getDayOfYearIndex(date), 15);
    assert.equal(idea.dayLabel, 'Day 15 of 365');
    assert.ok(idea.title.length > 0);
  });

  it('rotates across the 365-day cycle without repeating the same idea on adjacent days', () => {
    const first = getDailyBrainIdea(new Date('2026-01-01T12:00:00Z'));
    const second = getDailyBrainIdea(new Date('2026-01-02T12:00:00Z'));

    assert.notEqual(first.id, second.id);
    assert.equal(first.dayIndex, 1);
    assert.equal(second.dayIndex, 2);
  });
});
