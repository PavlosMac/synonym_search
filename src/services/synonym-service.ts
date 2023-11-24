import { BehaviorSubject, Subject } from 'rxjs';
import { SynonymUnit } from '../types/synonym';

const synonymn = new BehaviorSubject<SynonymUnit>({ canonicalForm: '', associated: new Set([]) });
const newSynonym = new BehaviorSubject<string>('');
//here where sending { event: eventTitle } , that way you can listen to diffrent events , for example 'INCREMENTED' you could even send values 
export const SynonymEventService = {
    getSynonyms: () => synonymn.getValue(),
    setSynonyms: (search: SynonymUnit) => synonymn.next(search),
    setNewAssociation: (word: string) => newSynonym.next(word),
    getNewSynonyms: () => newSynonym.getValue(),
    getNewAssociationAsync: () => newSynonym.asObservable(),
    getSynonymsNotification: () => synonymn.asObservable(),
};