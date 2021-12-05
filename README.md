# Wadoku Dict

This project provides a simple dictionary search based on [wadoku.de](https://wadoku.de)
xml data.

Deployment available under [dict.nihongosensei.app](https://dict.nihongosensei.app)

## Schema

The dictionary uses a single table for now which holds the converted xml entry in json and additional fields ot enable
text search.

```sql
create table entry
(
    id         int unsigned                        not null
        primary key,
    entry_json json                                null,
    lastchange timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    jlpt       tinyint unsigned                    null
)
    charset = utf8;

create table entry_map
(
    entry_id int                          not null,
    text     varchar(255) charset utf8mb4 not null,
    primary key (entry_id, text)
);

create fulltext index entry_map__text
    on entry_map (text);

create index entry_map__text_index
    on entry_map (text);

create table entry_ref
(
    target_id    int          not null,
    source_id    int          not null,
    type         varchar(255) not null,
    subentrytype varchar(255) null,
    primary key (target_id, source_id)
);

create index entry_ref__target_id
    on entry_ref (target_id);
```

## Import Data

See https://github.com/nihongosensei/wadoku-export-reader

## Wadoku XML Exports

See https://www.wadoku.de/downloads/xml-export/https://www.wadoku.de/downloads/xml-export/

## Wadoku Data License

See https://www.wadoku.de/wiki/display/WAD/Wadoku.de-Daten+Lizenz

## JLPT Levels

JLPT levels are imported from wikipedia: https://en.wiktionary.org/wiki/Appendix:JLPT

## Examples

Multiple Senses: [167612](https://nihongosensei.app/entry/167612)

Def and Text inside a TR: [1707](https://nihongosensei.app/entry/1707)

With a ref inside a Sense: [273](https://nihongosensei.app/entry/273)

Tr followed by a def: [208](https://nihongosensei.app/entry/208)

Tr followed by a def with multiple Tr: [515](https://nihongosensei.app/entry/515)

Multiple defs after a tr: [4029690](https://nihongosensei.app/entry/4029690)

Usg with type and reg: [4151](https://nihongosensei.app/entry/4151)

Long list of senses: [8042046](https://nihongosensei.app/entry/8042046)

With etym: [11712](https://nihongosensei.app/entry/11712)

With etym which has a ref: [8545](https://nihongosensei.app/entry/8545)

With etym which has a foreign word: [490814](https://nihongosensei.app/entry/490814)

With multiple etyms: [2516676](https://nihongosensei.app/entry/2516676)

Usg with type HINT: [3778315](https://nihongosensei.app/entry/3778315)

Usg with type TIME: [8444455](https://nihongosensei.app/entry/8444455)

Def followed by text: [8444455](https://nihongosensei.app/entry/8444455)

Usg on entry level: [5075870](https://nihongosensei.app/entry/5075870)

Famn and title: [226081](https://nihongosensei.app/entry/226081)

Season word: [10000528](https://nihongosensei.app/entry/10000528)

Many senses: [5260527](https://nihongosensei.app/entry/5260527)

Verb with 2 doushi definitions: [2972828](https://nihongosensei.app/entry/2972828)
