import { OcpApimSubscriptionKeyHeaders, ContentTypeHeaders, CommonConstructorOptions } from "../index";

export class qnaMaker {
	constructor(options: CommonConstructorOptions);

	/**
	 * Creates a new knowledge base.
	 */
	createKnowledgeBase(options: CreateKnowledgeBaseOptions): CreateKnowledgeBaseReturnValue;

	/**
	 * Deletes the specified knowledge base and all data associated with it.
	 */
	deleteKnowledgeBase(options: DeleteKnowledgeBaseOptions): void;

	/**
	 * Downloads all the data associated with the specified knowledge base.
	 */
	downloadKnowledgeBase(options: DownloadKnowledgeBaseOptions): Promise<string>;

	/**
	 * Returns the list of answers for the given question sorted in descending order of ranking score.
	 */
	generateAnswer(options: GenerateAnswerOptions): Promise<GenerateAnswerReturnValue>;

	/**
	 * Downloads all word alterations (synonyms) that have been automatically mined or added by the user.
	 */
	getAlterations(options: GetAlterationsOptions): Promise<GetAlterationsReturnValue>;

	/**
	 * Publish all unpublished in the knowledgebase to the prod endpoint
	 */
	publishKnowledgeBase(options: PublishKnowledgeBaseOptions): Promise<void>;

	/**
	 * The developer of the knowledge base service can use this API to submit user feedback for tuning question-answer matching. QnA Maker uses active learning to learn from the user utterances that come on a published Knowledge base service. In this process, QnA Maker records user feedback from different users and trains the knowledge base to respond accordingly, when there are sufficient number of users sending the same feedback. Every user feedback is logged and model training is triggered when there are 50 new feedback instances. Typically, the model updates are reflected when same question-answer pair from the knowledge base is sent as feedback for a given user query by at least 20 users. Most changes are immediately reflected in both the published and the saved knowledge bases. Some new question-answer pairs are only added to the saved knowledge base and they are moved to the published version in the next knowledge base publish operation by the developer. This gives the flexibility to the developer to keep or discard the newly added question-answer pairs.
	 */
	trainKnowledgeBase(options: TrainKnowledgeBaseOptions): Promise<void>;

	updateAlterations(_ref9: any): any;
	updateKnowledgeBase(_ref10: any): any;
}

//#region createKnowledgeBase
export interface CreateKnowledgeBaseOptions {
	headers?: CreateKnowledgeBaseHeaders,
	body: {
		/**
		 * Friendly name for the knowledge base (Required).
		 */
		name: string,

		/**
		 * List of question and answer pairs to be added to the knowledge base. Max 1000 Q-A pairs per request.
		 */
		qnapairs: { answer?: string, question?: string }[],

		/**
		 * List of URLs to be processed and indexed in the knowledge base. In case of existing URL, it will be fetched again and KB will be updated with new data. Max 5 urls per request.
		 */
		urls: string[]
	}

}

export interface CreateKnowledgeBaseHeaders {


}

export interface CreateKnowledgeBaseReturnValue {
	/**
	 * Holds the unique guid representing the knowledge base.
	 */
	kbId: string,

	/**
	 * Data extraction results.
	 */
	dataExtractionResults: {
		sourceType: string,
		extractionStatusCode: string,
		source: string
	}[]
}
//#endregion

//#region deleteKnowledgeBase
export interface DeleteKnowledgeBaseOptions {
	headers?: OcpApimSubscriptionKeyHeaders,
	parameters?: DeleteKnowledgeBaseParameters
}

export interface DeleteKnowledgeBaseParameters {
	/**
	 * knowledge base identity
	 */
	knowledgeBaseID: string
}

//#endregion

//#region downloadKnowledgeBase
export interface DownloadKnowledgeBaseOptions {
	headers?: OcpApimSubscriptionKeyHeaders,
	parameters?: DownloadKnowledgeBaseParameters
}

export interface DownloadKnowledgeBaseParameters {
	/**
	 * knowledge base identity
	 */
	knowledgeBaseID: string
}
//#endregion

//#region generateAnswer
export interface GenerateAnswerOptions {
	headers?: ContentTypeHeaders & OcpApimSubscriptionKeyHeaders,
	parameters?: GenerateAnswerParameters
}

export interface GenerateAnswerParameters {
	/**
	 * knowledgeBasedID, this should be get from QnAMaker portal
	 */
	knowledgeBaseID: string
}

export interface GenerateAnswerReturnValue {
	"answers": {
		answer: string,
		questions: string[],
		score: number
	}[]
}
//#endregion

//#region getAlterations
export interface GetAlterationsOptions {
	headers?: OcpApimSubscriptionKeyHeaders,
	parameters?: GetAlterationsParameters
}

export interface GetAlterationsParameters {
	/**
	 * knowledge base identity
	 */
	knowledgeBaseID: string
}

export interface GetAlterationsReturnValue {
	wordAlterations: {
		word: string,
		alterations: string[]
	}[]
}
//#endregion

//#region publishKnowledgeBase
export interface PublishKnowledgeBaseOptions {
	headers?: OcpApimSubscriptionKeyHeaders,
	parameters?: PublishKnowledgeBaseParameters
}

export interface PublishKnowledgeBaseParameters {
	/**
	 * knowledge base identity
	 */
	knowledgeBaseID: string
}

//#endregion

//#region trainKnowledgeBase
export interface TrainKnowledgeBaseOptions {
	parameters?: TrainKnowledgeBaseParameters,
	body: TrainKnowledgeBaseBody
}

export interface TrainKnowledgeBaseParameters {
	/**
	 * knowledge base identity
	 */
	knowledgeBaseID: string
}

export interface TrainKnowledgeBaseBody {
	feedbackRecords: {
		userId: number,
		userQuestion: string,
		kbQuestion: string,
		kbAnswer: string
	}[]
}

//#endregion